# Module School

Ce module gère les écoles sur la plateforme (vue Super-Administrateur).

## 🔌 Configuration Backend

### URL de l'API

L'URL du backend est configurée dans `src/app/core/config/api.config.ts` (via les environnements) :

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000"
};
```

### Contrat de l'API écoles (côté backend)

| But                          | Méthode | Corps                                                                                                              |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| Lister les écoles            | `GET /schools` | –                                                                                                                  |
| Créer une école              | `POST /schools` | `{ name (obligatoire), address?, city?, postalCode?, country?, phoneNumber?, email?, website?, adminUserId? }`     |
| Modifier une école           | `PATCH /schools/:id` | `{ name?, address?, city?, postalCode?, country?, phoneNumber?, email?, website? }` (champs absents = inchangés)  |
| Désactiver / réactiver       | `PATCH /schools/:id/toggle-block` | vide (bascule `ACTIVE` <-> `BLOCKED`)                                                                              |
| Changer l'administrateur     | `PATCH /schools/:schoolId/administrator` | `{ newAdminUserId }`                                                                                              |

⚠️ Limitations du backend actuel :
- **Pas de `GET /schools/:id`** → le frontend passe le résumé de l'école via le Router `state` (ou le retrouve dans le `SchoolFacade`).
- **`GET /schools` ne renvoie que** `[{ id, name }]` → la liste, les statistiques et le filtre par statut sont limités.
- **Pas de suppression** (`DELETE /schools/:id` n'existe pas).

### Réponse (objet école complet, sans enveloppe)

```json
{
  "id": "uuid",
  "name": "Institut Saint-Jean",
  "address": null,
  "city": "Yaoundé",
  "postalCode": null,
  "country": "Cameroun",
  "phoneNumber": null,
  "email": "contact@stjean.cm",
  "website": null,
  "status": "ACTIVE",
  "adminUserId": null,
  "createdAt": "2026-09-18T00:00:00.000Z",
  "updatedAt": "2026-09-18T00:00:00.000Z",
  "createdBy": "uuid"
}
```

### Statut

Valeurs possibles (MAJUSCULES) : `ACTIVE`, `INACTIVE`, `SUSPENDED`, `BLOCKED`.

Le login admin est `SUPER_ADMIN`, donc `PATCH /schools/:id/toggle-block` ne fait que basculer `ACTIVE` <-> `BLOCKED`.

### Authentification

Les requêtes sont envoyées avec `withCredentials: true` (cookies `access_token`). Le backend doit :
- Accepter les cookies ou l'en-tête `Authorization: Bearer …`
- Activer `CORS` avec `credentials: true`

Exemple de configuration CORS (Node.js/Express) :
```javascript
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
```

## 📁 Structure du module

```
school/
├── application/          # Couche application (services, facade)
│   ├── school.facade.ts
│   ├── school.service.ts
│   ├── school-membership.facade.ts
│   └── school-membership.service.ts
├── domain/               # Couche domaine (modèles, ports)
│   ├── models/
│   │   ├── school.model.ts
│   │   └── school-membership.model.ts
│   └── ports/
│       ├── school.repository.ts
│       └── school-membership.repository.ts
├── infrastructure/       # Couche infrastructure (adapters)
│   ├── dto/
│   ├── mappers/
│   └── repositories/
│       ├── http-school.repository.ts
│       └── http-school-membership.repository.ts
└── presentation/         # Couche présentation (UI)
    ├── components/
    │   ├── create-school-form/
    │   └── replace-admin-form/
    └── pages/
        ├── schools-list-page/
        ├── create-school-page/
        ├── edit-school-page/
        └── replace-admin-page/
```

## 🚀 Utilisation

1. Lance le backend (port `3000`).
2. `npm start` puis ouvre `http://localhost:4200`.
3. Connecte-toi en Super-Administrateur.
4. Menu **Écoles** → liste des écoles, création, modification, désactivation.

## 🧪 Test de la connexion

1. Connecte-toi (la connexion `POST /auth/web/login/email` pose le cookie).
2. Va sur `/s/schools`.
3. Ouvre la console du navigateur (F12 → Réseau) et vérifie :
   - `GET /schools` (200, tableau `[{ id, name }]`)
   - `PATCH /schools/:id/toggle-block` (200) lors d'une désactivation
   - `POST /schools` (201) lors d'une création
   - `PATCH /schools/:id` (200) lors d'une modification

## 🔧 Dépannage

- **401 Unauthorized** : connecte-toi en Super-Admin avant d'utiliser la page.
- **403 Forbidden** : le rôle `SUPER_ADMIN` est requis pour les routes `/schools`.
- **404 Not Found** : le backend actuel n'a pas de `GET /schools/:id` ; ouvre la page de modification depuis la liste.

## 📝 Notes

- Le formulaire de création n'envoie que le **nom obligatoire** + les champs renseignés (les champs vides sont ignorés).
- La modification est **partielle** : seuls les champs remplis sont envoyés au backend.
- Les statistiques affichent uniquement le **total** car l'API ne renvoie pas le statut dans la liste.