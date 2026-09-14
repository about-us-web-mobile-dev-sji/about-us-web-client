# Module School

Ce module gère les écoles sur la plateforme.

## 🔌 Configuration Backend

### URL de l'API

L'URL du backend est configurée dans le fichier d'environnement :

```typescript
// src/environments/environment.ts
export const environment = {
  apiUrl: "http://localhost:3000"  // URL de ton backend
};
```

### Endpoints attendus

Le module school attend que ton backend expose les endpoints suivants :

#### 1. Créer une école
```
POST /schools
Content-Type: application/json

Body:
{
  "name": "École primaire Jean Moulin",
  "code": "ECO-2024-001",
  "address": "12 rue de la République",
  "city": "Paris",
  "postalCode": "75001",
  "country": "France",
  "phone": "+33 1 23 45 67 89",
  "email": "contact@ecole.fr",
  "principalAdminId": "admin-123" // Optionnel
}

Response (201 Created):
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "École primaire Jean Moulin",
  "code": "ECO-2024-001",
  "address": "12 rue de la République",
  "city": "Paris",
  "postalCode": "75001",
  "country": "France",
  "phone": "+33 1 23 45 67 89",
  "email": "contact@ecole.fr",
  "status": "PENDING",
  "principalAdminId": "admin-123",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### 2. Récupérer une école par ID
```
GET /schools/:id

Response (200 OK):
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "École primaire Jean Moulin",
  ...
}
```

#### 3. Récupérer toutes les écoles
```
GET /schools

Response (200 OK):
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "École primaire Jean Moulin",
    ...
  },
  ...
]
```

#### 4. Mettre à jour une école
```
PATCH /schools/:id
Content-Type: application/json

Body:
{
  "name": "Nouveau nom"
}

Response (200 OK):
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Nouveau nom",
  ...
}
```

#### 5. Supprimer une école
```
DELETE /schools/:id

Response (204 No Content)
```

### Authentification

Les requêtes sont envoyées avec `withCredentials: true`, ce qui signifie que ton backend doit :
- Accepter les cookies
- Configurer CORS pour autoriser les credentials

Exemple de configuration CORS (Node.js/Express) :
```javascript
app.use(cors({
  origin: 'http://localhost:4200', // URL de ton frontend Angular
  credentials: true
}));
```

## 📁 Structure du module

```
school/
├── application/          # Couche application (services, facade)
│   ├── school.facade.ts
│   └── school.service.ts
├── domain/               # Couche domaine (modèles, ports)
│   ├── models/
│   │   └── school.model.ts
│   └── ports/
│       └── school.repository.ts
├── infrastructure/       # Couche infrastructure (adapters)
│   ├── dto/
│   │   └── school-response.dto.ts
│   ├── mappers/
│   │   └── school.mapper.ts
│   └── repositories/
│       └── http-school.repository.ts
└── presentation/         # Couche présentation (UI)
    ├── components/
    │   └── create-school-form/
    └── pages/
        └── create-school-page/
```

## 🚀 Utilisation

### 1. Configurer l'URL du backend

Modifie le fichier `src/environments/environment.ts` avec l'URL de ton backend :

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000" // Change selon ton backend
};
```

Pour la production, modifie aussi `src/environments/environment.prod.ts` (s'il existe).

### 2. Ajouter la route

Dans `src/app/app.routes.ts`, ajoute la route :

```typescript
import { CreateSchoolPage } from './features/school/presentation/pages/create-school-page/create-school-page';

export const routes: Routes = [
  // ... autres routes
  {
    path: 'schools/create',
    component: CreateSchoolPage,
    canActivate: [authGuard(['SUPER_ADMIN'])] // Ajuste les rôles
  }
];
```

### 3. Lancer le frontend

```bash
npm start
# ou
ng serve
```

Le frontend sera accessible sur `http://localhost:4200`.

## 🧪 Test de la connexion

Pour tester si le frontend communique bien avec le backend :

1. Lance ton backend
2. Lance le frontend avec `npm start`
3. Ouvre la console du navigateur (F12)
4. Va sur la page `/schools/create`
5. Remplis le formulaire
6. Clique sur "Enregistrer l'école"
7. Vérifie dans la console Network (onglet Réseau) que la requête POST est bien envoyée

## 🔧 Dépannage

### CORS Error
Si tu vois une erreur CORS, assure-toi que ton backend autorise les requêtes depuis `http://localhost:4200`.

### 401 Unauthorized
Le backend nécessite peut-être une authentification. Assure-toi d'être connecté en tant que Super-Admin.

### 404 Not Found
Vérifie que l'URL du backend est correcte et que les endpoints existent.

### Network Error
Vérifie que ton backend est bien lancé et accessible.

## 📝 Notes

- Le statut initial d'une école est `PENDING`
- Les valeurs possibles pour `status` sont : `ACTIVE`, `INACTIVE`, `PENDING`
- Le champ `principalAdminId` est optionnel
- Tous les autres champs sont obligatoires
