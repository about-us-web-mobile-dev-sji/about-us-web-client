import { Injectable, inject } from '@angular/core';
import { SchoolService } from './school.service';
import type { School, CreateSchoolCommand } from '../domain/models/school.model';

@Injectable({ providedIn: 'root' })
export class SchoolFacade {
  private readonly service = inject(SchoolService);

  async createSchool(command: CreateSchoolCommand): Promise<School> {
    try {
      const school = await this.service.createSchool(command);
      return school;
    } catch (error) {
      console.error('Erreur lors de la création de l\'école:', error);
      throw error;
    }
  }

  async getSchoolById(id: string): Promise<School | null> {
    try {
      return await this.service.getSchoolById(id);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'école:', error);
      throw error;
    }
  }

  async getAllSchools(): Promise<School[]> {
    try {
      return await this.service.getAllSchools();
    } catch (error) {
      console.error('Erreur lors de la récupération des écoles:', error);
      throw error;
    }
  }

  async updateSchool(id: string, command: Partial<CreateSchoolCommand>): Promise<School> {
    try {
      return await this.service.updateSchool(id, command);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'école:', error);
      throw error;
    }
  }

  async deleteSchool(id: string): Promise<void> {
    try {
      await this.service.deleteSchool(id);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'école:', error);
      throw error;
    }
  }
}
