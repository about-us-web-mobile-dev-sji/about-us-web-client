import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../../../../core/config/api.config';
import { School } from '../../domain/models/school.model';

@Injectable({ providedIn: 'root' })
export class HttpSchoolRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  list(): Promise<School[]> {
    return firstValueFrom(
      this.http.get<School[]>(`${this.baseUrl}/schools`, { withCredentials: true }),
    );
  }
}