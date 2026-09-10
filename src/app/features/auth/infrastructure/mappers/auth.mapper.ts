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
