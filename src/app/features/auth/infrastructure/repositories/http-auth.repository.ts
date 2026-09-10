import { AUTH_REPOSITORY } from '../../application/auth.tokens';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import type { AuthRepository, LoginCommand } from '../../domain/ports/auth.repository';
import { LoginResponse } from '../../domain/models/authenticated-user.model';
import { LoginResponseDto } from '../dto/login-response.dto';
import { mapLoginResponse } from '../mappers/auth.mapper';
import { API_BASE_URL } from '../../../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class HttpAuthRepository implements AuthRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  async login(command: LoginCommand): Promise<LoginResponse> {
    const dto = await firstValueFrom(
      this.http.post<LoginResponseDto>(`${this.baseUrl}/auth/web/login/email`, command, {
        withCredentials: true,
      }),
    );
    return mapLoginResponse(dto);
  }
  async restoreSession(): Promise<LoginResponse | null> {
    try {
      const dto = await firstValueFrom(
        this.http.post<LoginResponseDto>(
          `${this.baseUrl}/auth/web/refresh`,
          {},
          { withCredentials: true },
        ),
      );
      return mapLoginResponse(dto);
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 401) return null;
      throw error;
    }
  }

  async logout(): Promise<void> {
    await firstValueFrom(
      this.http.post<void>(`${this.baseUrl}/auth/web/logout`, {}, { withCredentials: true }),
    );
  }
}

export const AUTH_REPOSITORY_PROVIDER = {
  provide: AUTH_REPOSITORY,
  useExisting: HttpAuthRepository,
};
