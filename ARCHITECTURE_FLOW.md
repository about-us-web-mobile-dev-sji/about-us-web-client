# 🏗️ Architecture de connexion Frontend ↔️ Backend

## 📊 Flux de données

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Angular)                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  PRESENTATION LAYER (UI)                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  CreateSchoolPage (page container)                              │
│         │                                                        │
│         ├─> CreateSchoolForm (component)                        │
│         │        │                                               │
│         │        └─> Formulaire HTML + Validations              │
│         │                                                        │
│         └─> Émet événement: submitSchool()                      │
│                     │                                            │
└─────────────────────┼────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│  APPLICATION LAYER (Business Logic)                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  SchoolFacade                                                   │
│    └─> createSchool(command)                                    │
│              │                                                   │
│              ▼                                                   │
│  SchoolService                                                  │
│    └─> createSchool(command)                                    │
│              │                                                   │
│              └─> Logique métier (si nécessaire)                │
│                     │                                            │
└─────────────────────┼────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│  DOMAIN LAYER (Models & Interfaces)                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  SchoolRepository (interface/port)                              │
│    └─> create(command): Promise<School>                         │
│                                                                  │
│  Models:                                                         │
│    ├─> School (entité domaine)                                  │
│    ├─> CreateSchoolCommand                                      │
│    └─> SchoolStatus (enum)                                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│  INFRASTRUCTURE LAYER (External Adapters)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  HttpSchoolRepository (implémentation)                          │
│         │                                                        │
│         ├─> 1. Mapper: Command → DTO Request                    │
│         │       mapCreateSchoolRequest()                         │
│         │                                                        │
│         ├─> 2. HTTP Call: POST /schools                         │
│         │       HttpClient.post()                               │
│         │       - withCredentials: true                         │
│         │       - URL depuis API_BASE_URL                       │
│         │                                                        │
│         └─> 3. Mapper: DTO Response → Model                     │
│                 mapSchoolResponse()                             │
│                                                                  │
└─────────────────────┼────────────────────────────────────────────┘
                      │
                      │ HTTP Request
                      ▼
        ═══════════════════════════════════
               RÉSEAU (HTTP/HTTPS)
        ═══════════════════════════════════
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND API                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  POST /schools                                                  │
│    ├─> Controller                                               │
│    ├─> Service                                                  │
│    ├─> Repository                                               │
│    └─> Database                                                 │
│                                                                  │
│  Response:                                                       │
│    {                                                             │
│      "id": "uuid",                                               │
│      "name": "École...",                                         │
│      "status": "PENDING",                                        │
│      ...                                                         │
│    }                                                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Détail du flux étape par étape

### 1. L'utilisateur remplit le formulaire

```typescript
// CreateSchoolForm
<form (ngSubmit)="onSubmit()">
  <input formControlName="name" />
  <input formControlName="email" />
  ...
</form>
```

### 2. Le formulaire émet l'événement

```typescript
// CreateSchoolForm
onSubmit() {
  this.submitSchool.emit(this.schoolForm.getRawValue());
}
```

### 3. La page capture l'événement

```typescript
// CreateSchoolPage
async onSchoolSubmit(command: CreateSchoolCommand) {
  const school = await this.schoolFacade.createSchool(command);
}
```

### 4. Le Facade orchestre

```typescript
// SchoolFacade
async createSchool(command: CreateSchoolCommand) {
  return await this.service.createSchool(command);
}
```

### 5. Le Service applique la logique métier

```typescript
// SchoolService
async createSchool(command: CreateSchoolCommand) {
  // Logique métier ici (validations supplémentaires, etc.)
  return await this.repository.create(command);
}
```

### 6. Le Repository fait l'appel HTTP

```typescript
// HttpSchoolRepository
async create(command: CreateSchoolCommand) {
  const requestDto = mapCreateSchoolRequest(command);  // 1. Map vers DTO
  
  const responseDto = await firstValueFrom(
    this.http.post<SchoolResponseDto>(
      `${this.baseUrl}/schools`,                       // 2. Appel HTTP
      requestDto,
      { withCredentials: true }
    )
  );
  
  return mapSchoolResponse(responseDto);               // 3. Map vers Model
}
```

### 7. Les mappers transforment les données

```typescript
// school.mapper.ts

// Command → DTO (envoi au backend)
export function mapCreateSchoolRequest(command: CreateSchoolCommand) {
  return {
    name: command.name,
    code: command.code,
    // ... transformation si nécessaire
  };
}

// DTO → Model (réception depuis backend)
export function mapSchoolResponse(dto: SchoolResponseDto): School {
  return {
    id: dto.id,
    name: dto.name,
    createdAt: new Date(dto.createdAt),  // Conversion string → Date
    // ... transformation si nécessaire
  };
}
```

---

## 🔌 Configuration de l'injection de dépendances

```typescript
// app.config.ts

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Fournit HttpClient pour faire les requêtes
    provideHttpClient(),
    
    // 2. Configure l'URL de base de l'API
    { provide: API_BASE_URL, useValue: environment.apiUrl },
    
    // 3. Enregistre l'implémentation du repository
    SCHOOL_REPOSITORY_PROVIDER,
    //   ↓
    //   {
    //     provide: SCHOOL_REPOSITORY,    (interface)
    //     useExisting: HttpSchoolRepository   (implémentation)
    //   }
  ]
};
```

### Comment ça marche ?

1. `SchoolService` demande `SCHOOL_REPOSITORY`
2. Angular injecte `HttpSchoolRepository`
3. `HttpSchoolRepository` demande `API_BASE_URL` et `HttpClient`
4. Angular injecte `environment.apiUrl` et `HttpClient`

---

## 📦 Séparation des responsabilités

| Couche | Responsabilité | Fichiers |
|--------|---------------|----------|
| **Presentation** | UI, formulaires, événements | `*.html`, `*.css`, `*page.ts`, `*form.ts` |
| **Application** | Orchestration, cas d'usage | `*.facade.ts`, `*.service.ts` |
| **Domain** | Modèles métier, règles | `*.model.ts`, `*.repository.ts` (interface) |
| **Infrastructure** | Appels externes, adapters | `http-*.repository.ts`, `*.dto.ts`, `*.mapper.ts` |

---

## 🎯 Avantages de cette architecture

✅ **Testabilité** : Chaque couche peut être testée indépendamment

✅ **Maintenabilité** : Changement d'API backend = modification uniquement dans `infrastructure/`

✅ **Découplage** : Le domaine ne connaît pas l'infrastructure

✅ **Évolutivité** : Facile d'ajouter d'autres sources de données (localStorage, GraphQL, etc.)

---

## 🔄 Pour changer de backend

Si tu changes l'API backend, tu modifies uniquement :

1. **`environment.ts`** → URL du nouveau backend
2. **`*.dto.ts`** → Structure des données du nouveau backend
3. **`*.mapper.ts`** → Transformation des nouvelles données
4. **`http-*.repository.ts`** → Endpoints du nouveau backend

Le reste de l'application (presentation, application, domain) **ne change pas** !

---

## 📚 Ressources

- [QUICK_START.md](./QUICK_START.md) - Démarrage rapide
- [BACKEND_CONNECTION.md](./BACKEND_CONNECTION.md) - Guide détaillé
- [src/app/features/school/README.md](./src/app/features/school/README.md) - Documentation du module
