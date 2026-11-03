# DESIGN.md — règles visuelles d'About Us

Ce fichier fait foi pour toute interface de l'application. Le layout s'inspire de la console hPanel de Hostinger : un bandeau foncé, un panneau arrondi, des cartes blanches bordées. Les couleurs viennent du logo : le **bleu du A** pour agir, l'**orange du U** pour signaler.

Charte complète avec aperçus des composants : [Charte About Us](https://claude.ai/artifact/Trjo4UY84qBqkUX7q5X8g4).

## 1. Une seule source : le thème

**Tout le style vient de [`src/app/core/config/app-theme.ts`](src/app/core/config/app-theme.ts).** Il n'y a aucun fichier `.css` de composant, aucun `styles:` ni `styleUrl` dans les composants, et aucun style inline.

| Besoin | Où | Comment |
| --- | --- | --- |
| Couleurs, typographie, arrondis, apparence des composants PrimeNG | `app-theme.ts` → `primitive`, `semantic`, `components` | tokens PrimeNG |
| Couleurs de marque sans équivalent PrimeNG (orange, états, dégradé du shell, polices) | `app-theme.ts` → `extend.au` | exposées en variables `--p-au-*` |
| Mise en page partagée (shell, rail, gabarits de page, tableaux) | `app-theme.ts` → `css` | classes `.au-*`, qui ne référencent que des variables `--p-*` |
| Mise en page propre à un écran (flex, grid, espacements, tailles) | template | classes **Tailwind** |
| Branchement | `src/styles.css` | imports de Tailwind, de `tailwindcss-primeui` et de PrimeIcons uniquement ; aucun style |

Règles :
1. **Composants PrimeNG obligatoires** dès qu'ils existent : `p-select` (jamais `<select>`), `p-button` / `pButton` (jamais un `<button>` stylé à la main), `pInputText`, `pInputPassword`, `pTextarea`, `p-table` (jamais `<table>`), `p-dialog` (jamais de modale maison), `p-tag`, `p-avatar`, `p-card`, `p-message`, `p-breadcrumb`, `p-menu`, `p-paginator`, `p-toast`, `p-iconfield`…
2. **Tailwind uniquement avec les tokens du thème**, via le plugin `tailwindcss-primeui` : `bg-primary`, `text-primary`, `bg-primary-100`, `bg-surface-0` / `-50` / `-100`, `text-color`, `text-muted-color`, `border-surface`, `bg-emphasis`, `rounded-border`. Pour un token `extend`, utilisez la syntaxe `bg-(--p-au-success-soft)`. Les styles PrimeNG ne sont pas dans une couche CSS et l'emportent sur Tailwind : pour modifier un composant PrimeNG avec Tailwind, ajoutez `!` (`hover:border-primary!`). **Interdit** : les palettes Tailwind par défaut (`bg-blue-500`, `text-gray-600`…) et les couleurs en dur (`#…`).
3. Un besoin visuel commun à plusieurs écrans devient un token ou une classe `.au-*` dans `app-theme.ts`, jamais une chaîne Tailwind recopiée partout.
4. Un lien en forme de bouton s'écrit `<a pButton>` avec `<i pButtonIcon class="pi …">` et `<span pButtonLabel>` (l'attribut `icon` n'existe pas sur la directive).
5. Les composants PrimeNG 22 n'acceptent pas tous `styleClass` (seuls `p-button` et `p-breadcrumb` le gardent). Sur `p-card`, `p-message`, `p-avatar`, `p-tag` ou `p-progress-spinner`, utilisez `class`.

## 2. Couleurs

| Rôle | Token | Valeur | Classe Tailwind |
| --- | --- | --- | --- |
| Action principale, élément actif, liens | `primary.500` / `primary.color` | `#0050e6` | `bg-primary`, `text-primary` |
| Survol de l'action | `primary.600` | `#0042bf` | `bg-primary-emphasis` |
| Fond teinté (avatar, tuile d'icône) | `primary.100` | `#e8effe` | `bg-primary-100` |
| Bleu nuit | `primary.900` | `#0a1d57` | `bg-primary-900` |
| Cartes, champs, onglet actif | `surface.0` | `#ffffff` | `bg-surface-0` |
| Fond général | `surface.50` | `#f7f8fa` | `bg-surface-50` |
| Barre latérale principale | `surface.100` | `#eceef3` | `bg-surface-100` |
| Bordures | `surface.200` = `content.borderColor` | `#e2e6f0` | `border-surface` |
| Texte / texte secondaire | `text.color` / `text.mutedColor` | `#1b2133` / `#5b6478` | `text-color` / `text-muted-color` |
| Orange (remplissage uniquement) | `au.accent` | `#fc4a2c` | `bg-(--p-au-accent)` |
| Orange en texte | `au.accentInk` | `#c2361a` | `text-(--p-au-accent-ink)` |
| États | `au.success`, `au.warning`, `au.danger` (+ `Soft`) | voir le thème | préférez `p-tag` / `p-message` avec `severity` |

Contraste minimal de 4,5:1 pour tout texte. **Pas de texte blanc sur l'orange** (3,4:1) : écrivez en `surface.900`.

## 3. Typographie

DM Sans partout (`au.fontSans`), DM Mono pour les identifiants et les payloads (`au.fontMono`). Les polices sont chargées dans `index.html`.

**Taille de base unique : 16px** (`1rem`), partout, y compris la console des journaux. Elle est fixée à trois endroits qui doivent rester alignés : le token PrimeNG `typography.fontSize`, le `font-size` de `html, body` et des classes `.au-*` dans `css`, et le token Tailwind `--text-sm` dans `src/styles.css` (redéfini à 16px).

| Rôle | Taille / interligne | Graisse |
| --- | --- | --- |
| Titre de page (`.au-page-title`) | 28 / 36 | 500 |
| Titre de carte (`p-card` → `#title`) | 20 | 600 |
| Titre de bloc | 16 / 24 | 600 |
| Texte courant (taille de base, partout, journaux compris) | 16 / 24 | 400 |
| Libellés, métadonnées | 12–14 | 500 |

## 4. Formes

- Arrondis (`primitive.borderRadius`) : `xs` 4 · `sm` 6 · `md` 8 (boutons, champs, navigation) · `lg` 12 (sous-cartes, menus) · `xl` 16 (cartes, panneau).
- **Bordures, pas d'ombres** : `p-card` a une bordure de 1px et `shadow: none`. Les ombres sont réservées aux éléments flottants (menus, dialogues, popovers).

## 5. Shell

```
┌────────────────── bandeau 52px sur --p-au-shell-gradient ───────────────┐
│ [logo sur tuile blanche] About Us  (Espace administrateur)   Se déconnecter │
├─┬──────────────────────────────────────────────────────────────────────┬─┤
│ │ ╭── panneau surface.50, rayon 16px, marge 8px ──────────────────────╮ │ │
│ │ │ barre latérale │  contenu centré, max 1110px, padding 32px        │ │ │
│ │ │ surface.100    │  fil d'Ariane → titre + actions → cartes         │ │ │
│ │ ╰──────────────────────────────────────────────────────────────────╯ │ │
└─┴──────────────────────────────────────────────────────────────────────┴─┘
```

- **Fond du shell** (`au.shellGradient`) : un halo bleu sourd centré en haut de l'écran, qui tend vers le noir en s'éloignant. Il reste plus sourd que `primary.500` pour ne pas concurrencer les boutons.
- Le logo est toujours posé sur sa tuile blanche, jamais directement sur le bleu nuit.
- **Navigation principale** : l'entrée **Logs** ouvre un espace à part (sa propre barre latérale) ; icône liste, et un chevron `pi-chevron-right` gris en fin de ligne, masquée quand la barre est réduite.
- **Navigation principale (suite)** : l'élément actif se distingue uniquement par son fond blanc, sans bordure, avec une icône en `primary`. Les icônes font 18px, **même taille dépliée et réduite**.
- **Réduire** : le bouton est dans le pied de la barre, au-dessus du compte.
- **Rail** (barre réduite) : 64px, icônes seules et centrées (40 × 40px). Le libellé reste en infobulle et en `aria-label`.
- **Espace d'une école** (`/s/schools/:id`) : la barre de l'école (`.au-subnav`, 248px) **remplace** la navigation principale, qui n'est plus affichée. Elle a la même apparence qu'elle (fond `surface.100`, onglet actif blanc) et commence par un bouton « ← Retour aux écoles ».
  - Elle contient un `p-select` pour changer d'école, puis un onglet par sujet. **Espaces** est l'onglet principal (le premier, ouvert par défaut sur `/s/schools/:id`), puis Membres (`/members`, liste paginée avec photo, nom et e-mail),  **Invitations** (`/invitations`) et **Paramètres** (`/settings`). L'onglet actif est blanc.
  - L'onglet Espaces n'a ni titre de page ni carte : l'organigramme s'affiche directement sous le fil d'Ariane.
  - L'onglet Invitations suit le gabarit « Liste » : filtres de statut en pilules (Toutes, En attente, Expirées, Acceptées, Annulées), recherche par e-mail à droite (lancée 300 ms après la frappe), `p-table` paginé. Une ligne n'affiche le menu `⋮` que si une action est possible : Renvoyer (sauf si acceptée) et Annuler (si en attente ou expirée, avec confirmation). Après chaque action, la liste est rechargée.
  - L'onglet Paramètres suit le gabarit « Paramètres » ci-dessous (Profil, Coordonnées, Zone sensible ; Administration et Historique au 1/3). Le blocage passe par une confirmation `p-confirmdialog`.
  - **Organigramme dans une carte** (`p-card.au-flush.au-chart-card`), et ses commandes **à côté**, dans une barre verticale `.au-chart-rail` (façon canevas) : +, pourcentage, −, « Ajuster », un séparateur, puis « Actualiser ». Boutons icônes avec infobulle à gauche ; la barre reste visible au défilement (`sticky`). Sous 640px, elle passe au-dessus de la carte, à l'horizontale. La carte occupe **toute la hauteur disponible** dès l'affichage, et cette hauteur est fixe (voir plus bas). Son fond est un **canevas** : `surface.50` avec une grille de points `surface.300` tous les 20px ; les nœuds restent blancs, bordés en `surface.300` (la racine garde son bord `primary`).
  - **Zoom de l'organigramme** : boutons de la barre, plus Ctrl/⌘ + molette.
    - Par défaut, l'arbre est en ajustement automatique : il se réduit pour tenir dans la largeur, sans descendre sous 50 % ni dépasser 100 %. Au-delà, il défile horizontalement, centré sur la racine.
    - Un zoom manuel (30 % à 150 %) suspend l'ajustement automatique. « Ajuster » le réactive (bouton en bleu quand il est actif).
    - **L'arbre défile dans sa carte, avec des barres visibles** : la carte a une **hauteur fixe** (jusqu'au bas de la zone de contenu, 24rem minimum, recalculée au redimensionnement), donc la page ne défile pas sur cet onglet. La zone de l'arbre (`.au-chart-viewport`) défile dans les deux sens, avec des barres fines aux couleurs du thème (`surface.300`) ; on peut aussi glisser le fond de l'arbre à la souris, dans les deux sens.
    - L'échelle est la seule valeur de style calculée dans un template (`[style.transform]`, plus la taille du conteneur) : c'est une donnée dynamique, pas un style fixe.
  - **Ouvrir un espace** : un clic (ou Entrée) sur un nœud de l'organigramme ouvre `/s/schools/:id/spaces/:spaceId`. La barre de l'espace (`.au-space-nav`, 15rem, fond `--au-subtle`) se **colle** à celle de l'école (la zone de l'école passe en mode `stuck`, sans marges ni colonne) : « ← Organigramme », le nom de l'espace avec une icône, puis les onglets **Ressources** et **Membres** (libellé remplacé par la désignation de l'espace, ex. « Élèves », si elle existe).
    - **Ressources** : état vide `.au-empty` (pastille neutre, titre, phrase) : le partage de ressources n'existe pas encore côté API.
    - **Membres** : liste paginée (membre avec photo et e-mail, rôle Responsable / Membre, date d'ajout, menu ⋮ « Retirer de l'espace » avec confirmation), bouton « Ajouter un membre » qui ouvre un `app-modal` pour choisir un membre actif de l'école (recherche côté serveur).
    - Un glissé sur le fond de l'arbre n'ouvre pas d'espace (le clic est ignoré si le pointeur a bougé de plus de 5px).
  - Chaque onglet est une route enfant ; ajouter un sujet = ajouter un onglet et une route.

- **Profil dans la barre du haut** (façon Hostinger) : un bouton rond à filet clair avec l'icône personne. Il ouvre un `p-menu` popup qui suit les tokens de tous les menus (arrondi `lg` 12px, entrées 4 × 10px, écart 8px) : en-tête (nom en gras, e-mail en gris), entrées Profil et Sécurité, puis un bloc **Thème** (pilules Clair / Sombre / Système, à parts égales) et enfin **Se déconnecter**, sous des filets.
- **Thème** : `ThemeService` (`core/theme`) garde le choix dans le navigateur (`localStorage` `au-theme`, « Clair » par défaut) et suit le système en mode « Système ». Le mode sombre pose la classe `au-dark` sur `<html>`.
  - **Deux thèmes à part entière, pas une inversion.** Les styles maison lisent des **rôles** (`--au-bg` fond de page, `--au-panel` barres latérales, `--au-panel-hover`, `--au-card` cartes, `--au-active` élément actif, `--au-hover` survol, `--au-subtle` fonds discrets, `--au-border-strong`, `--au-border-hover`, `--au-text-head`, `--au-on-color` texte sur couleur), jamais un gris numéroté. Chaque thème leur donne ses propres valeurs. Dans un template, on écrit `bg-(--au-card)`, pas `bg-surface-0`.
  - **Thème sombre** : `color-scheme: dark`, qui active les valeurs sombres prévues par les tokens PrimeNG (`light-dark()`) et les contrôles natifs ; la palette `zinc` est redéfinie avec nos noirs graphite à peine froids (`#0b0c10` → `#f6f7f9`). Élévation par la lumière : page `#0b0c10`, barres latérales `#0f1115`, cartes `#14161c`, survol `#1c1f26`, élément actif `#22252d`, filets `#282b34`. Bleu d'action `#3a74f2` (texte blanc), couleurs d'état désaturées, fonds « soft » translucides, ombres plus noires, pilule choisie marquée par un filet clair.
- **Paramètres du compte** (`/s/account`) : comme l'espace d'une école, une barre dédiée (`.au-subnav`) remplace la navigation principale : « ← Retour », le titre « Paramètres du compte » (`.au-subnav-title`), puis deux onglets (Profil, Sécurité), chacun suivant le gabarit « Paramètres » (sections `.au-settings-section`) :
  - **Profil** (`/profile`, page « Informations personnelles ») : Identité (prénom, nom) et Compte (e-mail, rôle), en lecture seule ;
  - **Sécurité** (`/security`) : **Mot de passe** (super administrateur ; formulaire `.au-password-form` dans la carte : champs empilés de 26rem au plus, règle en aide sous « Nouveau mot de passe », pied à filet avec l'avertissement de reconnexion et « Enregistrer le mot de passe »), puis **Sessions** (`app-sessions-panel` en mode `embedded`, façon GitHub : par ligne une icône grise d'appareil, le nom, « Cet appareil » en vert à pastille, « Actif il y a … · connecté le … », et une action texte à droite, « Révoquer » ou « Se déconnecter » ; « Se déconnecter de tous les appareils » en pied `.au-settings-footer`). Pas d'onglet Activité : l'historique est dans la console des journaux.
  - Chaque page commence par `.au-page-head` (titre et phrase d'explication), comme toutes les pages.
  - L'ancienne adresse `/s/settings` redirige vers `/s/account/profile`.

- **Connexion** (`/login`) : le dégradé du bandeau (`au.shellGradient`) en plein écran, et au centre une carte compacte `.au-login-card` (26rem, `--au-card`, arrondi 16px, ombre profonde) : logo sur tuile blanche et « About Us », titre « Connexion » (24px) et une phrase, messages (succès, erreur) en `p-message` dans la carte, formulaire, séparateur « ou » entre deux filets, bouton « Continuer avec Google » (contour, logo Google). Mention discrète sous la carte. Vouvoiement.

## 6. Gabarits de page

Chaque page commence par `<div class="au-page">`, qui espace ses blocs de 24px. Les composants sans rendu dans le flux (`p-toast`, `p-confirmdialog`, `p-menu` popup) se placent **avant** ce `div`, jamais dedans : sinon chacun ajoute un espacement vide.

1. **Fil d'Ariane** : `p-breadcrumb`, sur les pages de détail.
2. **En-tête** (`.au-page-head`) : `h1.au-page-title` à gauche, au plus deux actions à droite (`.au-page-actions`), le bouton principal le plus à droite.
3. **Contenu** :
   - **Liste** : une rangée de filtres `.au-filters` (voir « Filtres et onglets »), puis le tableau dans `<p-card class="au-flush">`.
   - **Grille de cartes** (écoles, et toute collection d'objets qu'on ouvre), **neutre** façon cartes de projets Vercel : `<ul class="au-school-grid">` en grille `repeat(auto-fill, minmax(18rem, 1fr))`. Chaque carte (`.au-school-card`) est un lien bordé, sans couleur de fond :
     - aérée (28px de marge intérieure, 28px entre les blocs), **sans filet ni date** : en haut, le logo 48px bordé (ou l'initiale sur `--au-panel`) et le statut en `p-tag` à droite ; en bas, le nom (17px gras) et le site en gris ;
     - **aucune action sur la carte** : un clic l'ouvre ; au survol, le filet fonce légèrement et une ombre douce apparaît. Les actions sont dans les Paramètres de l'objet.
   - Les tableaux restent pour les données qu'on compare ligne à ligne (utilisateurs, journaux).
   - **Détail** : une grille `.au-overview`, avec les cartes aux 2/3 et une carte de synthèse au 1/3. La synthèse (`<aside>`) est **fixe** (`position: sticky`, 2rem du haut) : elle reste visible pendant que la colonne principale défile. Sous 1024px, elle repasse dans le flux.
   - **Paramètres** (façon Stripe / Linear), sobre : le bleu reste aux actions principales et au focus, **pas de pastilles d'icône bleues**.
     - **En-tête d'identité** `.au-settings-hero` (à la place de `.au-page-head`) : logo 64px bordé (`.au-identity-logo`, ou initiale sur `surface.100`), nom en `h1.au-page-title`, statut en `p-tag`, puis une ligne de métadonnées `.au-settings-meta` (« Créée par » avec `app-user-chip`, dates). Un filet la sépare des sections.
     - **Sections empilées** `.au-settings-section` : à gauche `.au-settings-intro` (titre 16px gras et une phrase d'explication), à droite le contenu dans `<p-card class="au-flush">`. Une ligne fine sépare les sections ; sous 900px, l'intitulé passe au-dessus du contenu.
     - Contenu : lignes éditables `.au-panel-row` (libellé | valeur | crayon contour, édition en place, voir § 9 ; liens en texte foncé souligné au survol), ou éléments `.au-settings-item` (contenu à gauche, action à droite), avec un pied `.au-settings-footer` (explication en gris, action à droite) sur fond `surface.50`.
     - **Zone sensible** : une carte au bord teinté de rouge (`.au-settings-danger`) avec un bouton `severity="danger"` contour. Débloquer (sans risque) revient à une carte neutre.
     - Un utilisateur s'affiche toujours avec `app-user-chip` (photo ou initiales, nom, e-mail si utile), jamais par son identifiant.
     - Pour une école : Profil (Nom, Logo), Coordonnées (E-mail, Téléphone, Site web), Administration (administrateurs actuels ; « Remplacer l'administrateur » ouvre un `p-dialog` pour choisir un membre actif, recherche côté serveur), Zone sensible (bloquer / débloquer).
     - Les anciennes classes `.au-panel-head`, `.au-panel-icon`, `.au-setting-row` et `.au-danger-zone` restent pour les autres écrans de réglages.

   - **Journaux d'événements** (`/s/events`), façon console de logs (modèle Vercel) : comme l'espace d'une école, **la barre des journaux remplace la navigation principale** (mode `is-flush` de `.au-content`) : elle commence par un bouton « ← Retour » vers l'accueil, et le contenu occupe toute la largeur, sans marges.
     - À gauche, `.au-logs-filters` (16rem, fond `surface.100` comme la navigation principale) : titre, « Réinitialiser », puis des groupes repliables (Type d'élément, Événement) dont les options ont une case à cocher ; un événement se filtre par son nom via la recherche.
     - En haut, `.au-logs-bar` : Actualiser, recherche pleine largeur (300 ms), bouton **Live** (rechargement toutes les 10 s, pastille verte qui pulse).
     - Liste `p-table.au-logs-table` : **lignes fines de 32px** alternées (`surface.50`), en-tête collant, heure et nom d'événement en DM Mono à chiffres alignés, type en petite étiquette bordée, acteur en texte (nom, ou e-mail ; pas de photo), message en gris tronqué. Marge horizontale de 12px autour de la liste, lignes aux coins arrondis. Pied : « 1–50 sur N » et flèches.
     - **Détail à droite** (`.au-logs-detail`, 22–26rem, fond `surface.50`) : un clic sur une ligne l'ouvre sans quitter la liste (ligne surlignée d'un bleu très léger, journal gardé dans l'URL `?log=…`). En-tête : type, nom, ↑ / ↓ (journal voisin), copier l'identifiant, fermer. Corps : « Survenu » et la date, carte de propriétés (Identifiant, Type, Élément — lien vers son historique —, Acteur, Message), puis bloc **Données** (JSON indenté, bouton copier). Échap ferme, ↑ / ↓ naviguent. Sous 1100px, le détail remplace la liste.
     - Pas d'histogramme : l'API ne fournit pas de comptage par jour.

## 7. Filtres et onglets

Deux composants qui se ressemblent, mais qui ne servent pas à la même chose :

| Besoin | Composant | Apparence |
| --- | --- | --- |
| **Filtrer** une même liste (statut, type…) | `p-selectbutton` avec `class="au-filter"` | Pilules segmentées : un conteneur gris arrondi (`surface.100`), l'option active en pilule blanche légèrement ombrée, les autres en `text-muted-color`. |
| **Changer de contenu** (des vues différentes, chacune avec sa propre structure) | `p-tabs` | Onglets soulignés. **Jamais pour un filtre.** |
| **Naviguer** entre les sujets d'un objet (école) | Barre latérale `.au-subnav` | Voir « Shell ». |

Rangée de filtres d'une liste :

```html
<div class="au-filters" role="search">
  <p-selectbutton class="au-filter" [options]="filters" optionLabel="label" optionValue="value"
                  [allowEmpty]="false" [(ngModel)]="status" ariaLabelledBy="…" />
  <p-iconfield class="au-search">…<input pInputText type="search" /></p-iconfield>
</div>
```

- Les pilules sont à gauche et la recherche à droite (20rem), sur la même ligne et **à la même hauteur : 42px** (pilules de 34px dans un conteneur de 4px de marge interne). Elles passent l'une sous l'autre quand la place manque. Pas de carte autour.
- La première option est toujours « Tous » ou « Toutes » (valeur vide ou `null`), et `[allowEmpty]="false"` garantit qu'une option reste sélectionnée.
- Un filtre s'applique immédiatement, sans bouton « Filtrer ». La recherche s'applique 300 ms après la frappe, ou à la touche Entrée si l'API l'impose.
- Au-delà de 6 options, ou pour des valeurs nombreuses ou dynamiques, utilisez un `p-select` à la place des pilules.
- Chaque groupe de pilules a un libellé accessible (`ariaLabelledBy` vers un texte `.sr-only`).

## 8. Notifications et erreurs

**Par défaut, un retour d'action s'affiche en popup, jamais dans la page.** Tout passe par `NotifyService` (`src/app/core/notifications/notify.service.ts`). Les pages n'utilisent jamais `MessageService` ni leur propre `<p-toast>`.

| Méthode | Quand | Durée |
| --- | --- | --- |
| `notify.success(titre, détail?)` | Action réussie (« Coordonnées mises à jour », « Invitation renvoyée ») | 4 s |
| `notify.info(titre, détail?)` | Information sans action requise | 5 s |
| `notify.warn(titre, détail?)` | Effet notable mais voulu (« École bloquée ») | 6 s |
| `notify.error(titre, détail?)` | Échec dont on connaît la cause | 7 s |
| `notify.fromError(error, titre, overrides?)` | Échec d'un appel : le détail est le message traduit du code backend (`{ code, message }`), via `core/i18n/error-messages.ts` ; `overrides` précise le message pour l'écran | 7 s |

**Position et gabarit** : un seul `<p-toast key="app">`, dans `app.html`.
- En haut à droite, sous le bandeau (`top: 4.25rem`, `right: 1.5rem`), largeur 22rem. Sur mobile, pleine largeur avec une marge de 1rem.
- Une carte blanche bordée, avec l'ombre flottante du thème. À gauche, une pastille ronde colorée par gravité (succès vert, info bleu, avertissement orange, erreur rouge) avec son icône. Puis un **titre** court en 14px gras, et un **détail** facultatif en gris. Bouton de fermeture neutre.
- Rédaction : le titre dit ce qui s'est passé (« Modification impossible », « Invitation envoyée ») ; le détail dit pourquoi ou quoi faire. Pas de « Erreur » seul.

**Exceptions (affichage dans la page)** :
- La **validation d'un champ** : un `p-message variant="simple"` sous le champ concerné.
- L'**échec de chargement** qui laisse une page ou une section vide : un `p-message` d'erreur à la place du contenu, avec un bouton « Réessayer ».
- Une **information durable** liée au contenu (ex. « L'administrateur actuel n'est pas encore fourni par l'API ») : un `p-message severity="info"`.
- La connexion : les erreurs d'identifiants restent sous le formulaire.

**Confirmation avant une action risquée** : un `p-confirmdialog`, avec l'action en `severity="danger"` et « Annuler » / « Garder » en `[text]`. Le résultat de l'action passe ensuite en popup.

## 9. Édition en place

Pour modifier une valeur affichée dans un panneau de réglages, il n'y a pas de page « Modifier » séparée : la ligne passe en édition.
- Le crayon (`.au-panel-action`) transforme la valeur en champ `pInputText` (taille `small`), présélectionné. L'action devient deux boutons ronds : Enregistrer (`pi-check`) et Annuler (`pi-times`, `[text]`). La ligne prend le fond `surface.50` (`.au-panel-row.is-editing`).
- **Entrée** enregistre, **Échap** annule. Une seule ligne est éditable à la fois : les autres crayons sont désactivés.
- Une valeur inchangée referme la ligne sans appel. Un champ facultatif vidé est envoyé à `null`.
- La validation s'affiche sous le champ. Le succès et l'échec passent en popup (`NotifyService`).
- Écoles : `PATCH /schools/:id`, avec uniquement le champ modifié.

## 10. Composants

- **Boutons** : un seul bouton principal (plein) par zone. Les autres sont `[outlined]="true"` + `severity="secondary"`, ou `[text]="true"`. Pour un lien, `<a pButton [routerLink]>`.
- **Tableaux** : `p-table` dans `<p-card class="au-flush">`. Les en-têtes sont discrets : 13px, graisse 600, `surface.700`, sans majuscules, padding 10 × 16px (règle sur le `th` dans `css`, car nos en-têtes ne passent pas par `.p-datatable-column-title`). Les en-têtes, les lignes de 64px, les séparateurs et le survol viennent des tokens `datatable` et de `css`. La première colonne contient un `p-avatar` (fond `bg-primary-100`) et le nom en gras. Dates : `.au-num`. Actions : `.au-col-actions` avec un `p-menu` popup (`pi pi-ellipsis-v`). Pagination : `p-paginator` dans la carte.
- **Statuts** : `p-tag` avec `severity` (`success`, `danger`, `warn`, `secondary`), libellé en français.
- **Erreurs et confirmations** : voir § 8 (popups via `NotifyService`, `p-message` seulement pour la validation de champ et les échecs de chargement).
- **Modals** : toujours `app-modal` (`src/app/shared/components/modal/modal.ts`), construit sur `p-dialog` (focus piégé, Échap, clic sur le fond, plein écran sous 640px ; fermeture bloquée tant que `busy`).
  - **Sobre et compact** : fond blanc, filet, arrondi 12px, ombre douce. Pastille d'icône 36px à gauche du titre (16px gras) et de la description (14px gris), petit bouton de fermeture discret. Contenu, puis pied séparé par un filet : « Annuler » en contour, action principale pleine, alignés à droite (empilés en pleine largeur sur mobile). Pas de bandeau coloré, pas de dégradé, pas de liste d'étapes : une phrase d'aide sous le champ suffit.
  - Les boutons du pied se placent dans `<ng-container modalFooter>` ; un bouton qui soumet le formulaire du contenu est un `<button pButton type="submit" form="…">`.
  - Tailles, volontairement étroites : `sm` 22rem, `md` 26rem (défaut), `lg` 36rem.
  - Variantes (`variant`) : **seule la pastille d'icône change**.
    | Variante | Quand | Pastille |
    | --- | --- | --- |
    | `neutral` | formulaire, réglage courant | contour : blanche, filet, ombre légère |
    | `brand` | créer, inviter | `primary.100`, icône `primary` |
    | `danger` | action destructrice | `au.danger` soft, icône rouge ; action `severity="danger"` |
    | `spotlight` | succès, annonce courte | ronde 48px, icône et titre centrés, pied sans filet |
  - Les confirmations simples (oui / non) restent un `p-confirmdialog`.
  - **Inviter un membre** : `app-invite-member-dialog` (variante `brand`), ouvert par le bouton « Inviter un membre » des onglets Membres et Invitations ; il recharge la liste des invitations après l'envoi.
- **Actions sur une carte ou un nœud** (organigramme, ligne de tableau) : jamais de rangée de boutons. Un seul bouton `⋮` (`pi pi-ellipsis-v`, `[text]`, `[rounded]`) ouvre un `p-menu` popup. Les actions destructrices sont séparées par un `separator` et portent `styleClass: 'au-menu-danger'`.
- **Icônes** : PrimeIcons (`pi pi-*`), une seule famille.

## 11. Rédaction

Vouvoiement, phrases courtes. Boutons à l'infinitif (« Créer une école », « Actualiser »), sans point final. Dates en `fr-FR`.

## 12. Accessibilité

Un focus visible sur tout élément interactif. Un `aria-label` sur tout bouton qui n'a qu'une icône. Aucune information portée uniquement par la couleur.
