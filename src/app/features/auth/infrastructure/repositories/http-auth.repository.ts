import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, type Observable } from 'rxjs';
import type { ChangePasswordCommand } from '../../domain/models/password-change.model';
import type { AuthRepository, LoginCommand } from '../../domain/ports/auth.repository';
import type { LoginResponse } from '../../domain/models/authenticated-user.model';
import { AUTH_REPOSITORY } from '../../application/auth.tokens';
import type { LoginResponseDto } from '../dto/login-response.dto';
import type { SessionResponseDto } from '../dto/session-response.dto';
import type { ActiveSession } from '../../domain/models/active-session.model';
import { mapActiveSession, mapLoginResponse } from '../mappers/auth.mapper';
import { API_BASE_URL } from '../../../../core/config/api.config';
import { toAppError } from '../../../../core/http/to-app-error';

/** Web endpoints whose 401 means "no session" rather than "session expired". */
export const AUTH_WEB_PATH = '/auth/web/';

@Injectable({ providedIn: 'root' })
export class HttpAuthRepository implements AuthRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  async login(command: LoginCommand): Promise<LoginResponse> {
    const dto = await this.send(
      this.http.post<LoginResponseDto>(`${this.baseUrl}${AUTH_WEB_PATH}login/email`, command),
    );
    return mapLoginResponse(dto);
  }

  async restoreSession(): Promise<LoginResponse | null> {
    try {
      const dto = await this.send(
        this.http.post<LoginResponseDto>(`${this.baseUrl}${AUTH_WEB_PATH}refresh`, {}),
      );
      return mapLoginResponse(dto);
    } catch (error) {
      if (toAppError(error).status === 401) return null;
      throw error;
    }
  }

  async logout(): Promise<void> {
    await this.send(this.http.post<void>(`${this.baseUrl}${AUTH_WEB_PATH}logout`, {}));
  }

  async changePassword(command: ChangePasswordCommand): Promise<void> {
    await this.send(
      this.http.patch<void>(`${this.baseUrl}/auth/password`, {
        currentPassword: command.currentPassword,
        newPassword: command.newPassword,
      }),
    );
  }

  async listSessions(): Promise<ActiveSession[]> {
    const dtos = await this.send(
      this.http.get<SessionResponseDto[]>(`${this.baseUrl}/auth/sessions`),
    );
    return dtos.map(mapActiveSession);
  }

  async revokeSession(sessionId: string): Promise<void> {
    await this.send(
      this.http.delete<void>(`${this.baseUrl}/auth/sessions/${encodeURIComponent(sessionId)}`),
    );
  }

  async revokeAllSessions(): Promise<void> {
    await this.send(this.http.delete<void>(`${this.baseUrl}/auth/sessions`));
  }

  /** UC-25: full-page navigation to the backend, which redirects to Google. */
  googleSignInUrl(returnUrl: string | null): string {
    const url = `${this.baseUrl}${AUTH_WEB_PATH}login/google`;
    return returnUrl ? `${url}?returnUrl=${encodeURIComponent(returnUrl)}` : url;
  }

  private async send<T>(request: Observable<T>): Promise<T> {
    try {
      return await firstValueFrom(request);
    } catch (error) {
      throw toAppError(error);
    }
  }
}

export const AUTH_REPOSITORY_PROVIDER = {
  provide: AUTH_REPOSITORY,
  useExisting: HttpAuthRepository,
};
