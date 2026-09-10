import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AUTH_REPOSITORY, LoginCommand } from '../../domain/ports/auth.repository';
import { LoginResponseDto } from '../dto/login-response.dto';
import { mapLoginResponse } from '../mappers/auth.mapper';
import { API_BASE_URL } from '../../../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class HttpAuthRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  async login(command: LoginCommand) {
    const dto = await firstValueFrom(
      this.http.post<LoginResponseDto>(`${this.baseUrl}/auth/login`, command),
    );
    return mapLoginResponse(dto);
  }
}

export const AUTH_REPOSITORY_PROVIDER = {
  provide: AUTH_REPOSITORY,
  useExisting: HttpAuthRepository as any,
};
