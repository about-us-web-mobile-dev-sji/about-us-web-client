import { Injectable, inject, signal } from '@angular/core';
import { SchoolService } from './school.service';
import type { CreateSchoolCommand, School, SchoolSummary } from '../domain/models/school.model';

@Injectable({ providedIn: 'root' })
export class SchoolFacade {
  private readonly service = inject(SchoolService);

  /** Liste des écoles chargées pour la page de gestion (le backend ne renvoie que id + name). */
  readonly schools = signal<SchoolSummary[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<unknown>(null);
  private readonly updatingIds = signal<Set<string>>(new Set());

  async createSchool(command: CreateSchoolCommand): Promise<School> {
    try {
      return await this.service.createSchool(command);
    } catch (error) {
      console.error("Erreur lors de la création de l'école:", error);
      throw error;
    }
  }

  async updateSchool(id: string, command: Partial<CreateSchoolCommand>): Promise<School> {
    try {
      return await this.service.updateSchool(id, command);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'école:", error);
      throw error;
    }
  }

  /** Charge les écoles dans le signal `schools`. */
  async loadSchools(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      this.schools.set(await this.service.listSchools());
    } catch (error) {
      console.error('Erreur lors du chargement des écoles:', error);
      this.error.set(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  isUpdating(schoolId: string): boolean {
    return this.updatingIds().has(schoolId);
  }

  /**
   * Récupère une école par son id à partir de la liste `schools` déjà chargée
   * (le backend n'expose pas de GET /schools/:id).
   */
  async getSchoolById(schoolId: string): Promise<School> {
    await this.loadSchools();
    const summary = this.schools().find((school) => school.id === schoolId);
    if (!summary) {
      throw new Error(`École introuvable: ${schoolId}`);
    }
    return this.toSchool(summary);
  }

  /**
   * Désactive/réactive une école via PATCH /schools/:id/toggle-block.
   * Le backend décide lui-même de basculer ACTIVE <-> BLOCKED.
   */
  async toggleBlock(school: SchoolSummary): Promise<SchoolSummary> {
    if (this.updatingIds().has(school.id)) return school;
    this.updatingIds.update((set) => new Set(set).add(school.id));

    try {
      const updated = await this.service.toggleBlock(school.id);
      const summary = this.toSchoolSummary(updated);
      this.schools.update((items) =>
        items.map((item) => (item.id === summary.id ? summary : item)),
      );
      return summary;
    } finally {
      this.updatingIds.update((set) => {
        const next = new Set(set);
        next.delete(school.id);
        return next;
      });
    }
  }

  private toSchoolSummary(school: School): SchoolSummary {
    return {
      id: school.id,
      name: school.name,
      address: school.address,
      city: school.city,
      postalCode: school.postalCode,
      country: school.country,
      phoneNumber: school.phoneNumber,
      email: school.email,
      website: school.website,
      status: school.status,
      adminUserId: school.adminUserId,
      createdAt: school.createdAt.toISOString(),
      updatedAt: school.updatedAt.toISOString(),
    };
  }

  private toSchool(summary: SchoolSummary): School {
    return {
      id: summary.id,
      name: summary.name,
      address: summary.address,
      city: summary.city,
      postalCode: summary.postalCode,
      country: summary.country,
      phoneNumber: summary.phoneNumber,
      email: summary.email,
      website: summary.website,
      status: summary.status,
      adminUserId: summary.adminUserId,
      createdAt: new Date(summary.createdAt),
      updatedAt: new Date(summary.updatedAt),
    };
  }
}
