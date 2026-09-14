import { Injectable, inject } from '@angular/core';
import { SCHOOL_REPOSITORY } from '../domain/ports/school.repository';
import type { School, CreateSchoolCommand } from '../domain/models/school.model';

@Injectable({ providedIn: 'root' })
export class SchoolService {
  private readonly repository = inject(SCHOOL_REPOSITORY);

  async createSchool(command: CreateSchoolCommand): Promise<School> {
    // Ici tu peux ajouter de la logique métier supplémentaire avant d'appeler le repository
    return await this.repository.create(command);
  }

  async getSchoolById(id: string): Promise<School | null> {
    return await this.repository.findById(id);
  }

  async getAllSchools(): Promise<School[]> {
    return await this.repository.findAll();
  }

  async updateSchool(id: string, command: Partial<CreateSchoolCommand>): Promise<School> {
    return await this.repository.update(id, command);
  }

  async deleteSchool(id: string): Promise<void> {
    return await this.repository.delete(id);
  }
}
