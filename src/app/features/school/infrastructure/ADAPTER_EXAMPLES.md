# 🔧 Exemples d'adaptation pour différents backends

Ce fichier contient des exemples pour adapter le code si ton backend a une structure différente.

## 📝 Cas 1 : Noms de champs différents

### Ton backend renvoie :
```json
{
  "school_id": "123",
  "school_name": "École Jean Moulin",
  "school_code": "ECO-001",
  "street_address": "12 rue de la République",
  "city_name": "Paris",
  "zip_code": "75001",
  "country_name": "France",
  "phone_number": "+33123456789",
  "email_address": "contact@ecole.fr",
  "school_status": "active",
  "admin_id": "admin-123",
  "created_date": "2024-01-15T10:30:00Z",
  "updated_date": "2024-01-15T10:30:00Z"
}
```

### Modifie `school.mapper.ts` :
```typescript
export function mapSchoolResponse(dto: any): School {
  return {
    id: dto.school_id,
    name: dto.school_name,
    code: dto.school_code,
    address: dto.street_address,
    city: dto.city_name,
    postalCode: dto.zip_code,
    country: dto.country_name,
    phone: dto.phone_number,
    email: dto.email_address,
    status: dto.school_status.toUpperCase() as SchoolStatus,
    principalAdminId: dto.admin_id,
    createdAt: new Date(dto.created_date),
    updatedAt: new Date(dto.updated_date),
  };
}

export function mapCreateSchoolRequest(command: CreateSchoolCommand): any {
  return {
    school_name: command.name,
    school_code: command.code,
    street_address: command.address,
    city_name: command.city,
    zip_code: command.postalCode,
    country_name: command.country,
    phone_number: command.phone,
    email_address: command.email,
    admin_id: command.principalAdminId,
  };
}
```

## 📝 Cas 2 : Endpoints différents

### Ton backend utilise des URL différentes

Si ton backend a des endpoints comme :
- `POST /api/v1/schools/register` au lieu de `POST /schools`
- `GET /api/v1/schools/:id/details` au lieu de `GET /schools/:id`

### Modifie `http-school.repository.ts` :
```typescript
async create(command: CreateSchoolCommand): Promise<School> {
  const requestDto = mapCreateSchoolRequest(command);
  const responseDto = await firstValueFrom(
    this.http.post<SchoolResponseDto>(
      `${this.baseUrl}/api/v1/schools/register`,  // ← Change ici
      requestDto,
      { withCredentials: true }
    ),
  );
  return mapSchoolResponse(responseDto);
}

async findById(id: string): Promise<School | null> {
  try {
    const dto = await firstValueFrom(
      this.http.get<SchoolResponseDto>(
        `${this.baseUrl}/api/v1/schools/${id}/details`,  // ← Change ici
        { withCredentials: true }
      ),
    );
    return mapSchoolResponse(dto);
  } catch (error: any) {
    if (error?.status === 404) return null;
    throw error;
  }
}
```

## 📝 Cas 3 : Réponse avec wrapper/enveloppe

### Ton backend renvoie :
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "École Jean Moulin",
    ...
  },
  "message": "School created successfully"
}
```

### Modifie `school-response.dto.ts` :
```typescript
export interface ApiResponseWrapper<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface SchoolResponseDto {
  id: string;
  name: string;
  // ... autres champs
}
```

### Modifie `http-school.repository.ts` :
```typescript
async create(command: CreateSchoolCommand): Promise<School> {
  const requestDto = mapCreateSchoolRequest(command);
  const response = await firstValueFrom(
    this.http.post<ApiResponseWrapper<SchoolResponseDto>>(
      `${this.baseUrl}/schools`,
      requestDto,
      { withCredentials: true }
    ),
  );
  return mapSchoolResponse(response.data);  // ← Extrait 'data'
}
```

## 📝 Cas 4 : Authentification par token Bearer

### Ton backend nécessite un token Bearer au lieu de cookies

### Modifie `http-school.repository.ts` :
```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HttpSchoolRepository implements SchoolRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); // ou sessionStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  async create(command: CreateSchoolCommand): Promise<School> {
    const requestDto = mapCreateSchoolRequest(command);
    const responseDto = await firstValueFrom(
      this.http.post<SchoolResponseDto>(
        `${this.baseUrl}/schools`,
        requestDto,
        { headers: this.getHeaders() }  // ← Utilise headers au lieu de withCredentials
      ),
    );
    return mapSchoolResponse(responseDto);
  }

  // Fais pareil pour les autres méthodes...
}
```

## 📝 Cas 5 : Pagination pour la liste

### Ton backend renvoie des résultats paginés

```json
{
  "items": [...],
  "total": 50,
  "page": 1,
  "pageSize": 10
}
```

### Modifie `school.repository.ts` :
```typescript
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface SchoolRepository {
  // ...
  findAll(page?: number, pageSize?: number): Promise<PaginatedResponse<School>>;
}
```

### Modifie `http-school.repository.ts` :
```typescript
async findAll(page = 1, pageSize = 10): Promise<PaginatedResponse<School>> {
  const response = await firstValueFrom(
    this.http.get<{items: SchoolResponseDto[], total: number, page: number, pageSize: number}>(
      `${this.baseUrl}/schools?page=${page}&pageSize=${pageSize}`,
      { withCredentials: true }
    ),
  );
  
  return {
    items: response.items.map(mapSchoolResponse),
    total: response.total,
    page: response.page,
    pageSize: response.pageSize,
  };
}
```

## 📝 Cas 6 : Validation d'erreurs côté backend

### Ton backend renvoie des erreurs de validation détaillées

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": {
    "name": "Name is required",
    "email": "Invalid email format"
  }
}
```

### Crée un intercepteur d'erreurs

Crée `src/app/core/interceptors/error.interceptor.ts` :
```typescript
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 400 && error.error?.errors) {
        // Affiche les erreurs de validation
        Object.entries(error.error.errors).forEach(([field, message]) => {
          messageService.add({
            severity: 'error',
            summary: `Erreur ${field}`,
            detail: message as string,
          });
        });
      }
      return throwError(() => error);
    })
  );
};
```

Enregistre-le dans `app.config.ts` :
```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([errorInterceptor])),
    // ... autres providers
  ],
};
```

## 📝 Cas 7 : Upload de fichiers (logo de l'école)

### Si tu veux ajouter l'upload d'un logo

### Modifie `school.model.ts` :
```typescript
export interface CreateSchoolCommand {
  // ... champs existants
  logo?: File;
}
```

### Modifie `http-school.repository.ts` :
```typescript
async create(command: CreateSchoolCommand): Promise<School> {
  const formData = new FormData();
  formData.append('name', command.name);
  formData.append('code', command.code);
  formData.append('address', command.address);
  formData.append('city', command.city);
  formData.append('postalCode', command.postalCode);
  formData.append('country', command.country);
  formData.append('phone', command.phone);
  formData.append('email', command.email);
  
  if (command.principalAdminId) {
    formData.append('principalAdminId', command.principalAdminId);
  }
  
  if (command.logo) {
    formData.append('logo', command.logo);
  }

  const responseDto = await firstValueFrom(
    this.http.post<SchoolResponseDto>(
      `${this.baseUrl}/schools`,
      formData,  // ← FormData au lieu de JSON
      { withCredentials: true }
    ),
  );
  return mapSchoolResponse(responseDto);
}
```

## 🔍 Debugging : Voir les requêtes HTTP

Pour débugger, ajoute des logs :

```typescript
async create(command: CreateSchoolCommand): Promise<School> {
  const requestDto = mapCreateSchoolRequest(command);
  
  console.log('🚀 Requête POST /schools');
  console.log('URL:', `${this.baseUrl}/schools`);
  console.log('Body:', requestDto);
  
  const responseDto = await firstValueFrom(
    this.http.post<SchoolResponseDto>(
      `${this.baseUrl}/schools`,
      requestDto,
      { withCredentials: true }
    ),
  );
  
  console.log('✅ Réponse:', responseDto);
  
  return mapSchoolResponse(responseDto);
}
```

## 📞 Besoin d'aide ?

Si ton backend a une structure vraiment différente :
1. Ouvre la console réseau (F12 → Network)
2. Fais une requête avec Postman ou curl
3. Note la structure exacte de la réponse
4. Adapte les DTOs et mappers selon les exemples ci-dessus

N'hésite pas à consulter la documentation de ton backend API !
