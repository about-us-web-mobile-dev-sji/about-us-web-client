import { Injectable, inject } from '@angular/core';
import { SpaceService } from './space.service';
import type { EnsureSchoolRootCommand, EnsureSchoolRootResult, Space } from '../domain/models/space.model';

@Injectable({ providedIn: 'root' })
export class SpaceFacade {
  private readonly service = inject(SpaceService);

  async getSchoolTree(schoolId: string): Promise<Space[]> {
    try {
      return await this.service.getSchoolTree(schoolId);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'arborescence des espaces:', error);
      throw error;
    }
  }

  async ensureSchoolRoot(command: EnsureSchoolRootCommand): Promise<EnsureSchoolRootResult> {
    try {
      return await this.service.ensureSchoolRoot(command);
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de l\'espace racine:', error);
      throw error;
    }
  }
}
