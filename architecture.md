Sur cette base, je te propose une architecture Angular **modulaire, progressive et pragmatique** : une Clean Architecture stricte pour les fonctionnalités complexes, mais légère pour les fonctionnalités simples.

## 1. Structure générale

```text
src/
└── app/
    ├── core/
    │   ├── config/
    │   ├── http/
    │   ├── auth/
    │   ├── routing/
    │   └── layout/
    │
    ├── shared/
    │   ├── ui/
    │   ├── forms/
    │   ├── pipes/
    │   ├── directives/
    │   └── utils/
    │
    ├── features/
    │   ├── auth/
    │   ├── users/
    │   ├── schools/
    │   ├── attendance/
    │   └── payments/
    │
    ├── app.component.ts
    ├── app.config.ts
    └── app.routes.ts
```

Cette structure sépare :

* ce qui est global à toute l’application ;
* ce qui est réutilisable ;
* ce qui appartient à une fonctionnalité métier.

---

# 2. Le dossier `core`

`core` contient les éléments instanciés ou utilisés à l’échelle de toute l’application.

```text
core/
├── config/
│   ├── api.config.ts
│   └── environment.ts
│
├── http/
│   ├── auth.interceptor.ts
│   ├── error.interceptor.ts
│   └── api-client.service.ts
│
├── auth/
│   ├── session.service.ts
│   ├── auth-state.service.ts
│   └── auth.guard.ts
│
├── layout/
│   ├── app-shell/
│   └── main-layout/
│
└── routing/
    └── route-permission.guard.ts
```

On peut y placer :

* les interceptors HTTP ;
* la gestion globale de session ;
* les guards ;
* la configuration de l’API ;
* les layouts principaux ;
* l’état global d’authentification ;
* les erreurs techniques communes.

On ne doit pas y mettre les éléments propres à une fonctionnalité donnée.

Par exemple, `UserRepository` ne devrait pas être dans `core`, mais dans `features/users`.

---

# 3. Le dossier `shared`

`shared` contient les composants réutilisables qui ne portent pas de logique métier spécifique.

```text
shared/
├── ui/
│   ├── button/
│   ├── modal/
│   ├── data-table/
│   ├── empty-state/
│   ├── loading-state/
│   └── notification/
│
├── forms/
│   ├── form-field/
│   ├── form-error/
│   └── validators/
│
├── pipes/
│   ├── date-format.pipe.ts
│   └── file-size.pipe.ts
│
├── directives/
│   └── permission.directive.ts
│
└── utils/
    ├── date.utils.ts
    └── object.utils.ts
```

Exemples acceptables dans `shared` :

* un bouton ;
* une modal ;
* un tableau générique ;
* un composant de chargement ;
* un pipe de date ;
* un champ de formulaire générique.

Exemples qui ne devraient pas être dans `shared` :

```text
StudentAttendanceTable
SchoolSubscriptionCard
RouterTokenCard
```

Ces composants appartiennent respectivement aux fonctionnalités concernées.

---

# 4. Organisation d’une fonctionnalité

Chaque fonctionnalité possède son propre espace.

```text
features/
└── users/
    ├── domain/
    ├── application/
    ├── infrastructure/
    └── presentation/
```

Cependant, toutes les fonctionnalités n’ont pas besoin de remplir les quatre dossiers.

## Fonctionnalité simple

```text
features/
└── countries/
    ├── data/
    │   └── countries-api.service.ts
    └── presentation/
        └── countries-page/
```

Flux :

```text
CountriesPage → CountriesApiService → Backend
```

## Fonctionnalité intermédiaire

```text
features/
└── users/
    ├── application/
    │   └── users.facade.ts
    ├── infrastructure/
    │   └── users-api.service.ts
    └── presentation/
        ├── users-page/
        └── user-table/
```

Flux :

```text
UsersPage → UsersFacade → UsersApiService → Backend
```

## Fonctionnalité complexe

```text
features/
└── attendance/
    ├── domain/
    │   ├── entities/
    │   │   └── attendance.entity.ts
    │   ├── value-objects/
    │   └── ports/
    │       └── attendance.repository.ts
    │
    ├── application/
    │   ├── use-cases/
    │   │   ├── start-attendance-session.use-case.ts
    │   │   └── submit-attendance.use-case.ts
    │   └── facades/
    │       └── attendance.facade.ts
    │
    ├── infrastructure/
    │   ├── repositories/
    │   │   └── http-attendance.repository.ts
    │   ├── mappers/
    │   └── dto/
    │
    └── presentation/
        ├── pages/
        ├── components/
        └── state/
```

Flux :

```text
Page
  ↓
Facade
  ↓
Use Case
  ↓
Repository
  ↓
HTTP API
  ↓
Backend
```

---

# 5. Exemple concret pour `auth`

```text
features/auth/
├── application/
│   ├── auth.facade.ts
│   └── use-cases/
│       ├── login.use-case.ts
│       ├── logout.use-case.ts
│       └── refresh-session.use-case.ts
│
├── domain/
│   ├── models/
│   │   ├── authenticated-user.model.ts
│   │   └── session.model.ts
│   └── ports/
│       └── auth.repository.ts
│
├── infrastructure/
│   ├── repositories/
│   │   └── http-auth.repository.ts
│   ├── dto/
│   │   └── login-response.dto.ts
│   └── mappers/
│       └── auth.mapper.ts
│
└── presentation/
    ├── pages/
    │   ├── login-page/
    │   └── forgot-password-page/
    └── components/
        └── login-form/
```

## Flux

```text
LoginPage
    ↓
AuthFacade
    ↓
LoginUseCase
    ↓
AuthRepository
    ↓
HttpAuthRepository
    ↓
HttpClient
    ↓
Backend
```

Le composant ne connaît pas `HttpClient`.

Le use case ne connaît pas Angular.

Le repository abstrait le moyen d’accès au backend.

Le repository HTTP contient l’implémentation concrète.

---

# 6. Les responsabilités

## Composant

Responsable de l’affichage et des interactions visuelles.

```ts
submit(): void {
  if (this.form.invalid) {
    return;
  }

  this.authFacade.login(this.form.getRawValue());
}
```

Il ne doit pas contenir :

* d’appel HTTP direct ;
* de règle métier importante ;
* de logique de stockage ;
* de transformation complexe des réponses API.

## Façade

Responsable de simplifier l’accès de la présentation à l’application.

```ts
@Injectable()
export class UsersFacade {
  private readonly api = inject(UsersApiService);

  readonly users = signal<User[]>([]);
  readonly isLoading = signal(false);

  async loadUsers(): Promise<void> {
    this.isLoading.set(true);

    try {
      const users = await this.api.findAll();
      this.users.set(users);
    } finally {
      this.isLoading.set(false);
    }
  }
}
```

La façade est utile pour gérer :

* l’état de chargement ;
* les erreurs ;
* les notifications ;
* la navigation ;
* la combinaison de plusieurs actions.

## Use case

Responsable d’une action applicative significative.

```ts
export class SubmitAttendanceUseCase {
  constructor(
    private readonly repository: AttendanceRepository,
  ) {}

  execute(command: SubmitAttendanceCommand): Promise<Attendance> {
    return this.repository.submit(command);
  }
}
```

Il est pertinent si l’action :

* contient une orchestration ;
* utilise plusieurs sources ;
* transforme les données ;
* possède des conditions ;
* représente une intention métier claire.

## Repository

Le repository décrit l’accès aux données sans exposer la technologie.

```ts
export interface AttendanceRepository {
  submit(command: SubmitAttendanceCommand): Promise<Attendance>;
  findBySession(sessionId: string): Promise<Attendance[]>;
}
```

## Service API

Le service API connaît Angular et HTTP.

```ts
@Injectable()
export class AttendanceApiService {
  private readonly http = inject(HttpClient);

  submit(command: SubmitAttendanceCommand) {
    return firstValueFrom(
      this.http.post<AttendanceResponse>(
        '/api/attendance',
        command,
      ),
    );
  }
}
```

---

# 7. Les modèles frontend

Il faut distinguer trois types de modèles.

## DTO

Format reçu ou envoyé à l’API.

```ts
export interface UserResponseDto {
  id: string;
  first_name: string;
  last_name: string;
}
```

## Modèle applicatif

Format utilisé par la logique frontend.

```ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
}
```

## View model

Format adapté à un écran précis.

```ts
export interface UserRowViewModel {
  id: string;
  fullName: string;
  initials: string;
  statusLabel: string;
}
```

Pour une petite fonctionnalité, ces trois modèles peuvent être identiques. Il ne faut les séparer que lorsque cela apporte une réelle clarté.

---

# 8. Les règles de dépendance

```text
Presentation → Application
Application → Domain
Infrastructure → Domain/Application
Domain → rien de technique
```

Plus concrètement :

```text
Component
  peut utiliser une Facade

Facade
  peut utiliser un Use Case ou un service applicatif

Use Case
  peut utiliser des ports et des modèles du domaine

Repository HTTP
  implémente un port et utilise HttpClient

Domain
  ne dépend jamais d’Angular
```

Le domaine ne doit jamais importer :

```ts
@angular/core
@angular/common/http
rxjs
```

Si le domaine contient `Observable`, il devient directement dépendant de la manière dont Angular gère les données.

---

# 9. Où placer l’état ?

## État local à un composant

```ts
readonly isMenuOpen = signal(false);
readonly isLoading = signal(false);
```

Il reste dans le composant.

## État d’une fonctionnalité

```text
features/users/application/users.facade.ts
```

ou :

```text
features/users/presentation/state/users.store.ts
```

Il concerne plusieurs composants d’une même fonctionnalité.

## État global

```text
core/auth/auth-state.service.ts
```

Il concerne toute l’application :

* utilisateur connecté ;
* permissions ;
* session ;
* thème ;
* configuration globale.

Il ne faut pas mettre toutes les données dans un store global.

---

# 10. Architecture finale recommandée

```text
src/app/
├── core/
│   ├── auth/
│   ├── config/
│   ├── http/
│   ├── layout/
│   └── routing/
│
├── shared/
│   ├── ui/
│   ├── forms/
│   ├── pipes/
│   ├── directives/
│   └── utils/
│
├── features/
│   ├── auth/
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── presentation/
│   │
│   ├── users/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── presentation/
│   │
│   ├── schools/
│   ├── attendance/
│   └── payments/
│
├── app.config.ts
├── app.routes.ts
└── app.component.ts
```

La règle pratique est :

> Une fonctionnalité simple reste simple. Une fonctionnalité complexe reçoit davantage de séparation.

Tu peux donc avoir simultanément :

```text
CountriesPage → CountriesApiService
```

et :

```text
AttendancePage
  → AttendanceFacade
  → SubmitAttendanceUseCase
  → AttendanceRepository
  → HttpAttendanceRepository
  → API
```

C’est cette adaptation du niveau d’architecture à la complexité réelle de la fonctionnalité qui rend l’architecture propre sans la rendre lourde.
