# AboutUs - Frontend Client

Application Angular pour la gestion des écoles et utilisateurs.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.6.

## 🚀 Quick Start

### Prérequis
- Node.js (v18+)
- npm (v9+)
- Backend API lancé et accessible

### Installation

```bash
# Installer les dépendances
npm install

# Configurer l'URL du backend (voir section Configuration)
# Éditer src/environments/environment.ts

# Lancer le serveur de développement
npm start
```

L'application sera accessible sur `http://localhost:4200/`

## ⚙️ Configuration

### Connexion au Backend

**Fichier : `src/environments/environment.ts`**

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000"  // ← Change avec l'URL de ton backend
};
```

📖 **Guides de connexion :**
- [QUICK_START.md](./QUICK_START.md) - Démarrage rapide en 3 étapes
- [BACKEND_CONNECTION.md](./BACKEND_CONNECTION.md) - Guide détaillé de connexion
- [ARCHITECTURE_FLOW.md](./ARCHITECTURE_FLOW.md) - Architecture et flux de données

### Test de connexion

Ouvre `test-backend-connection.html` dans un navigateur pour tester la connexion avec ton backend.

## 📁 Structure du projet

```
src/
├── app/
│   ├── core/                    # Config globale, layout
│   ├── features/                # Modules métier
│   │   ├── auth/               # Authentification
│   │   ├── school/             # Gestion des écoles ⭐ NOUVEAU
│   │   └── users/              # Gestion des utilisateurs
│   └── app.config.ts           # Configuration de l'app
├── environments/                # Configuration par environnement
└── styles.css                  # Styles globaux
```

## 🏫 Module School (NOUVEAU)

Module complet pour la gestion des écoles avec connexion backend.

### Structure

```
features/school/
├── domain/                     # Modèles et interfaces
├── application/                # Logique métier (Facade, Service)
├── infrastructure/             # Connexion HTTP, DTOs, Mappers
└── presentation/               # UI (Pages, Composants)
```

### Fonctionnalités

- ✅ Créer une école (US 2.1)
- ✅ Formulaire avec validations complètes
- ✅ Connexion au backend via HTTP
- ✅ Gestion des erreurs
- ✅ Messages de succès/erreur
- ✅ Design responsive

### Documentation

- [src/app/features/school/README.md](./src/app/features/school/README.md) - Documentation complète du module
- [src/app/features/school/infrastructure/ADAPTER_EXAMPLES.md](./src/app/features/school/infrastructure/ADAPTER_EXAMPLES.md) - Exemples d'adaptation

## 🏗️ Architecture

Le projet suit une **architecture en couches** (Clean Architecture) :

- **Presentation** : UI, composants, pages
- **Application** : Logique métier, orchestration
- **Domain** : Modèles, règles métier, ports
- **Infrastructure** : Adapters externes (HTTP, storage, etc.)

Voir [ARCHITECTURE_FLOW.md](./ARCHITECTURE_FLOW.md) pour plus de détails.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
