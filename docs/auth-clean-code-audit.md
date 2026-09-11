# Audit du module auth

## Périmètre et conclusion

Audit du domaine, du service applicatif, du SignalStore, de la façade, du repository HTTP
et du formulaire de connexion. Les écarts concrets ci-dessous ont été corrigés.
SOLID guide la conception ; les tests ne constituent pas une certification de
conformité absolue ni un audit de sécurité du backend.

## Corrections

| Principe | Écart initial | Organisation retenue |
| --- | --- | --- |
| Responsabilité unique | État d’interface dans le modèle métier ; sérialisation incluse dans le store | AuthState dans application ; AuthOperationQueue séparée ; store responsable de l’état |
| Ouvert/fermé | Interprétation de HttpErrorResponse dans le store | Le repository retourne null en absence de session ; changer de transport ne nécessite pas de modifier le store |
| Substitution | Contrat de restauration implicitement lié au statut HTTP 401 | Contrat explicite session/null/rejet ; tests avec un repository sans HTTP et avec le repository HTTP |
| Ségrégation des interfaces | Les opérations d’authentification étaient réparties dans trois use cases | AuthService regroupe login, restoreSession et logout ; il utilise les trois opérations du port AuthRepository |
| Inversion des dépendances | Injection Angular dans le domaine et le use case ; restauration/logout directement dans le store | Domaine et service applicatif TypeScript purs ; injection par constructeurs ; composition Angular dans auth.tokens.ts |

Autres changements : modèles de session readonly au niveau TypeScript, formulaire
nonNullable sans assertion de type, suppression de updateEmail de démonstration,
réutilisation de LoginCommand, signatures publiques explicites et formatage.
Une initialisation mise en file après une connexion ne remplace plus cette session.

Le store et la façade restent des adaptateurs Angular/NgRx dans application,
conformément à l’organisation actuelle du projet. Une interprétation de Clean
Architecture exigeant toute la couche application indépendante du framework
nécessiterait de déplacer ces adaptateurs en présentation. Le noyau métier et
le service applicatif sont, eux, indépendants. Les messages français du store constituent
également un choix propre à cette interface ; une application multilingue devrait
exposer des codes d’erreur puis traduire dans la présentation.

## Vérification

- Tests du flux HTTP : cookies, mapping, rôles, restauration, erreurs et déconnexion.
- Tests avec un repository substituable sans HTTP : absence de session,
  sérialisation des opérations, initialisation après connexion et reprise après erreur.
- Compilation Angular et contrôle des imports du domaine/du service applicatif.

## Points fonctionnels non résolus par cet audit

- La restauration au démarrage ne remplace pas un mécanisme de renouvellement
  pendant l’utilisation ni une synchronisation entre onglets.
- Les DTO sont typés à la compilation ; aucune validation runtime du JSON reçu
  n’est actuellement réalisée.

## Protection des routes

Les routes `/home` et `/s/home` sont maintenant protégées par authGuard.
La page de connexion redirige vers `/s/home` pour SUPER_ADMIN et `/home` pour USER.
`/forbidden` explique le refus d’accès, et `/` redirige vers `/home`.
Les tests de navigation vérifient les visiteurs anonymes, les rôles, la restauration
et les redirections après connexion.
