import type { SchoolStatus } from '../../domain/models/school.model';

/** Réponse de GET /schools (liste « classique » pour l'ensemble du produit). */
export interface SchoolSummaryDto {
  id: string;
  name: string;
}

/** Réponse de GET /schools/managed (liste détaillée pour la gestion des écoles, super-admin). */
export interface SchoolManagedDto {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
  phoneNumber: string | null;
  email: string | null;
  website: string | null;
  status: SchoolStatus;
  adminUserId: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
}

export interface SchoolResponseDto {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
  phoneNumber: string | null;
  email: string | null;
  website: string | null;
  status: SchoolStatus;
  adminUserId: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy?: string | null;
}

/** Corps de POST /schools (name obligatoire, le reste optionnel). */
export interface CreateSchoolRequestDto {
  name: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  adminUserId?: string;
}

/** Corps de PATCH /schools/:id (tous les champs optionnels, champs absents = inchangés). */
export interface UpdateSchoolRequestDto {
  name?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
}
