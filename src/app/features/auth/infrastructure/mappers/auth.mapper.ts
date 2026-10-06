import type { SessionResponseDto } from '../dto/session-response.dto';
import type { ActiveSession } from '../../domain/models/active-session.model';
import { LoginResponseDto } from '../dto/login-response.dto';
import { LoginResponse } from '../../domain/models/authenticated-user.model';

export function mapLoginResponse(dto: LoginResponseDto): LoginResponse {
  return {
    user: {
      id: dto.user.id,
      email: dto.user.email,
      firstName: dto.user.firstName,
      lastName: dto.user.lastName,
      globalRole: dto.user.globalRole,
    },
    sessionId: dto.sessionId,
  };
}

export function mapActiveSession(dto: SessionResponseDto): ActiveSession {
  return {
    id: dto.id,
    clientType: dto.clientType,
    userAgent: dto.userAgent,
    createdAt: new Date(dto.createdAt),
    lastActivityAt: new Date(dto.lastActivityAt),
    expiresAt: new Date(dto.expiresAt),
    current: dto.current,
  };
}
