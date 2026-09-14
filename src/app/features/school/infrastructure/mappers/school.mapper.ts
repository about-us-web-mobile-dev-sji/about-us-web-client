import type { School, SchoolStatus, CreateSchoolCommand } from '../../domain/models/school.model';
import type {
  SchoolResponseDto,
  CreateSchoolRequestDto,
} from '../dto/school-response.dto';

export function mapSchoolResponse(dto: SchoolResponseDto): School {
  return {
    id: dto.id,
    name: dto.name,
    code: dto.code,
    address: dto.address,
    city: dto.city,
    postalCode: dto.postalCode,
    country: dto.country,
    phone: dto.phone,
    email: dto.email,
    status: dto.status as SchoolStatus,
    principalAdminId: dto.principalAdminId,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  };
}

export function mapCreateSchoolRequest(command: CreateSchoolCommand): CreateSchoolRequestDto {
  return {
    name: command.name,
    code: command.code,
    address: command.address,
    city: command.city,
    postalCode: command.postalCode,
    country: command.country,
    phone: command.phone,
    email: command.email,
    principalAdminId: command.principalAdminId,
  };
}
