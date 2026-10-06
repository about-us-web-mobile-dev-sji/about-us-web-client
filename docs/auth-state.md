# État de l’utilisateur connecté

`AuthStore` est fourni à la racine de l’application. Il conserve une seule session
`{ user, sessionId }`, le chargement, l’erreur et la fin de l’initialisation.
`user`, `sessionId`, `isAuthenticated`, `isSuperAdmin`, `userFirstName` et `userName`
sont calculés : aucun booléen d’authentification indépendant à synchroniser.
`isAuthenticated` décrit l’état connu du client ; le backend reste responsable
de vérifier la session et les permissions.

La façade expose le store sans dupliquer son état. Les composants existants
peuvent continuer à injecter `AuthFacade`, ou injecter directement `AuthStore`.
Les méthodes renvoient des Promises pour préserver `await auth.login(...)`
et laisser la navigation au composant. SignalStore accepte les méthodes async :
https://ngrx.io/guide/signals/signal-store

## Cookies et restauration

Le backend local définit les cookies HttpOnly. Le repository transmet
`withCredentials: true` sur les trois opérations :

- `POST /auth/web/login/email` : connexion avec `{ email, password }`.
- `POST /auth/web/refresh` : restauration de `{ user, sessionId }` et rotation des cookies.
- `POST /auth/web/logout` : révocation et suppression des cookies.

`GET /auth/me` ne renvoie pas le profil complet dans ce backend ; il ne peut donc
pas remplacer directement le refresh pour reconstruire le modèle voulu.
`provideAppInitializer` attend la restauration avant le démarrage de l’application.
Un 401 correspond à une absence de session ; les autres erreurs restent visibles.
Aucun localStorage/sessionStorage n’est utilisé. Le sessionId est une métadonnée,
pas un jeton à envoyer dans Authorization.

La restauration est mutualisée et les mutations de cookies sont exécutées dans
l’ordre au sein de cette instance du store. Un échec de déconnexion conserve
la session connue et remonte l’erreur. Cette sérialisation ne synchronise pas
plusieurs onglets. Aucun renouvellement périodique ou retry global des requêtes
métier n’est ajouté.

HttpOnly empêche la lecture des cookies par JavaScript, mais ne protège pas à lui
seul de toutes les conséquences d’une XSS. Le serveur contrôle les attributs des
cookies, CORS avec credentials et la validation de l’origine.

## Utilisation

```ts
readonly auth = inject(AuthFacade);

// Dans un template : auth.user(), auth.userName(), auth.isSuperAdmin(), auth.error().
// Après connexion ou déconnexion, le composant décide de la navigation.
await this.auth.login({ email, password });
await this.auth.logout();
```

Les routes `/home` et `/s/home` attendent `auth.initialize()` dans le guard.
`/home` accepte tout utilisateur connecté ; `/s/home` exige SUPER_ADMIN.
Un visiteur anonyme est redirigé vers `/login?returnUrl=...` ; un rôle insuffisant
vers `/forbidden`. La route `/` redirige vers `/home`.

Après connexion, SUPER_ADMIN rejoint toujours `/s/home` et USER rejoint `/home`.
Cette destination dépend uniquement du rôle, indépendamment de returnUrl.
La navigation remplace le login dans l’historique. Les autorisations du backend
restent nécessaires indépendamment des guards.

## Service applicatif

`AuthService` regroupe `login`, `restoreSession` et `logout` dans un seul fichier.
Le store l’injecte via `AUTH_SERVICE`. Le service dépend du port `AuthRepository`
et reste indépendant d’Angular ; sa création est configurée dans `auth.tokens.ts`.
Le flux est : composant → façade → store → service → repository.
