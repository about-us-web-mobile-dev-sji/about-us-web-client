import type { SchoolStatus } from '../../domain/models/school.model';
import type { UserSummary } from '../../../../shared/users/user-summary';

/** Réponse de GET /schools, POST /schools et PATCH /schools/:id/toggle-block. */
export interface SchoolDetailDto {
  id: string;
  name: string;
  phoneNumber: string | null;
  email: string | null;
  website: string | null;
  logo: string | null;
  status: SchoolStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: UserSummary | null;
}

/** @deprecated Alias — la liste renvoie désormais le détail complet. */
export type SchoolListItemDto = SchoolDetailDto;

/** Corps de POST /schools. */
export interface CreateSchoolRequestDto {
  name: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  logo?: string;
}

/** Corps de PATCH /schools/:id (champs absents = inchangés, null = vidé). */
export interface UpdateSchoolRequestDto {
  name?: string;
  phoneNumber?: string | null;
  email?: string | null;
  website?: string | null;
  logo?: string | null;
}
