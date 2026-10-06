import { Injectable, inject, signal } from '@angular/core';
import { SchoolService } from './school.service';
import type { CreateSchoolCommand, School, SchoolSummary } from '../domain/models/school.model';
import { mapSchoolToSummary } from '../infrastructure/mappers/school.mapper';

@Injectable({ providedIn: 'root' })
export class SchoolFacade {
  private readonly service = inject(SchoolService);

  readonly schools = signal<SchoolSummary[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<unknown>(null);
  private readonly updatingIds = signal<Set<string>>(new Set());
  private readonly detailById = signal<Map<string, School>>(new Map());

  async createSchool(command: CreateSchoolCommand): Promise<School> {
    try {
      const school = await this.service.createSchool(command);
      this.cacheDetail(school);
      const summary = mapSchoolToSummary(school);
      this.schools.update((items) => {
        if (items.some((item) => item.id === summary.id)) {
          return items.map((item) => (item.id === summary.id ? summary : item));
        }
        return [summary, ...items];
      });
      return school;
    } catch (error) {
      console.error("Erreur lors de la création de l'école:", error);
      throw error;
    }
  }

  async loadSchools(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const list = await this.service.listSchools();
      const details = new Map(this.detailById());
      for (const school of list) {
        details.set(school.id, school);
      }
      this.detailById.set(details);
      this.schools.set(list.map(mapSchoolToSummary));
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

  async getSchoolById(schoolId: string): Promise<School> {
    const cached = this.detailById().get(schoolId);
    if (cached) {
      return cached;
    }

    await this.loadSchools();
    const fromCache = this.detailById().get(schoolId);
    if (!fromCache) {
      throw new Error(`École introuvable: ${schoolId}`);
    }
    return fromCache;
  }

  async toggleBlock(school: SchoolSummary): Promise<SchoolSummary> {
    if (this.updatingIds().has(school.id)) return school;
    this.updatingIds.update((set) => new Set(set).add(school.id));

    try {
      const updated = await this.service.toggleBlock(school.id);
      this.cacheDetail(updated);
      const summary = mapSchoolToSummary(updated);
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

  private cacheDetail(school: School): void {
    this.detailById.update((map) => {
      const next = new Map(map);
      next.set(school.id, school);
      return next;
    });
  }
}
