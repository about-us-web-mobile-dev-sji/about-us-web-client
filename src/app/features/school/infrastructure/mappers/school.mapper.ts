import type {
  CreateSchoolCommand,
  School,
  SchoolListItem,
  SchoolSummary,
} from '../../domain/models/school.model';
import type {
  CreateSchoolRequestDto,
  SchoolDetailDto,
} from '../dto/school-response.dto';

export function mapSchoolListItem(dto: SchoolDetailDto): SchoolListItem {
  return {
    id: dto.id,
    name: dto.name,
  };
}

export function mapSchoolDetail(dto: SchoolDetailDto): School {
  return {
    id: dto.id,
    name: dto.name,
    phoneNumber: dto.phoneNumber ?? null,
    email: dto.email ?? null,
    website: dto.website ?? null,
    status: dto.status ?? null,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
    createdBy: dto.createdBy ?? null,
  };
}

export function mapSchoolToSummary(school: School): SchoolSummary {
  return {
    id: school.id,
    name: school.name,
    phoneNumber: school.phoneNumber,
    email: school.email,
    website: school.website,
    status: school.status,
    createdAt: school.createdAt.toISOString(),
    updatedAt: school.updatedAt.toISOString(),
    createdBy: school.createdBy,
  };
}

export function mapListItemToSummary(item: SchoolListItem): SchoolSummary {
  return {
    id: item.id,
    name: item.name,
    phoneNumber: null,
    email: null,
    website: null,
    status: null,
    createdAt: null,
    updatedAt: null,
    createdBy: null,
  };
}

/** Mappe une ligne de GET /schools (désormais complète) vers SchoolSummary. */
export function mapSchoolDetailDtoToSummary(dto: SchoolDetailDto): SchoolSummary {
  return mapSchoolToSummary(mapSchoolDetail(dto));
}

export function mapCreateSchoolRequest(command: CreateSchoolCommand): CreateSchoolRequestDto {
  const dto: CreateSchoolRequestDto = {
    name: command.name.trim(),
  };
  if (command.address?.trim()) dto.address = command.address.trim();
  if (command.phoneNumber?.trim()) dto.phoneNumber = command.phoneNumber.trim();
  if (command.email?.trim()) dto.email = command.email.trim();
  if (command.website?.trim()) dto.website = command.website.trim();
  return dto;
}
