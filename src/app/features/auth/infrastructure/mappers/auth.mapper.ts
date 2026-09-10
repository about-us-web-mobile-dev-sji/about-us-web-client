import { LoginResponseDto } from '../dto/login-response.dto';
import { AuthenticatedUser } from '../../domain/models/authenticated-user.model';

export function mapLoginResponse(dto: LoginResponseDto): AuthenticatedUser {
  return {
    id: dto.id,
    email: dto.email,
    token: dto.access_token,
  };
}
