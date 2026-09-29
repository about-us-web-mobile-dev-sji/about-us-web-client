import type { CreateSchoolCommand, School, SchoolSummary } from '../../domain/models/school.model';
import type {
  CreateSchoolRequestDto,
  SchoolManagedDto,
  SchoolResponseDto,
  UpdateSchoolRequestDto,
} from '../dto/school-response.dto';

export function mapSchoolSummary(dto: SchoolManagedDto): SchoolSummary {
  return {
    id: dto.id,
    name: dto.name,
    address: dto.address,
    city: dto.city,
    postalCode: dto.postalCode,
    country: dto.country,
    phoneNumber: dto.phoneNumber,
    email: dto.email,
    website: dto.website,
    status: dto.status,
    adminUserId: dto.adminUserId,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

export function mapSchoolResponse(dto: SchoolResponseDto): School {
  return {
    id: dto.id,
    name: dto.name,
    address: dto.address,
    city: dto.city,
    postalCode: dto.postalCode,
    country: dto.country,
    phoneNumber: dto.phoneNumber,
    email: dto.email,
    website: dto.website,
    status: dto.status,
    adminUserId: dto.adminUserId,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
    createdBy: dto.createdBy ?? null,
  };
}

function withOptionalFields(
  command: Partial<CreateSchoolCommand>,
  dto: UpdateSchoolRequestDto,
): void {
  const optionalFields: (keyof UpdateSchoolRequestDto)[] = [
    'address',
    'city',
    'postalCode',
    'country',
    'phoneNumber',
    'email',
    'website',
  ];
  for (const field of optionalFields) {
    const value = (command as Record<string, string | undefined>)[field]?.trim();
    if (value) {
      dto[field] = value;
    }
  }
}

export function mapCreateSchoolRequest(command: CreateSchoolCommand): CreateSchoolRequestDto {
  const dto: CreateSchoolRequestDto = {
    name: command.name.trim(),
  };
  withOptionalFields(command, dto);
  if (command.adminUserId?.trim()) {
    dto.adminUserId = command.adminUserId.trim();
  }
  return dto;
}

export function mapUpdateSchoolRequest(
  command: Partial<CreateSchoolCommand>,
): UpdateSchoolRequestDto {
  const dto: UpdateSchoolRequestDto = {};
  withOptionalFields(command, dto);
  if (command.name?.trim()) {
    dto.name = command.name.trim();
  }
  return dto;
}
