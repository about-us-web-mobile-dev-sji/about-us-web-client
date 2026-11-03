import { Injectable, inject, signal } from '@angular/core';
import { SpaceService } from './space.service';
import { SchoolFacade } from '../../school/application/school.facade';
import { UsersService } from '../../users/application/users.service';
import { UserStatus, type User } from '../../users/domain/models/user.model';
import { userLabel } from '../../../shared/users/user-summary';
import type {
  ArchiveSpaceCommand,
  AssignManagerCommand,
  CreateSpaceCommand,
  DeleteSpaceCommand,
  EnsureSchoolRootCommand,
  EnsureSchoolRootResult,
  MoveSpaceCommand,
  RestoreSpaceCommand,
  Space,
  SpaceEffectiveManagers,
  SpaceListItem,
  SpaceMembership,
  SpaceMembersPage,
} from '../domain/models/space.model';

@Injectable({ providedIn: 'root' })
export class SpaceFacade {
  private readonly service = inject(SpaceService);
  private readonly schoolFacade = inject(SchoolFacade);
  private readonly usersService = inject(UsersService);

  readonly spaces = signal<SpaceListItem[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  async getSchoolTree(schoolId: string): Promise<Space[]> {
    try {
      return await this.service.getSchoolTree(schoolId);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'arborescence des espaces:", error);
      throw error;
    }
  }

  async ensureSchoolRoot(command: EnsureSchoolRootCommand): Promise<EnsureSchoolRootResult> {
    try {
      return await this.service.ensureSchoolRoot(command);
    } catch (error) {
      console.error("Erreur lors de l'initialisation de l'espace racine:", error);
      throw error;
    }
  }

  async createSpace(command: CreateSpaceCommand): Promise<Space> {
    try {
      return await this.service.createSpace(command);
    } catch (error) {
      console.error("Erreur lors de la création de l'espace:", error);
      throw error;
    }
  }

  async getEffectiveManagers(spaceId: string): Promise<SpaceEffectiveManagers> {
    try {
      return await this.service.getEffectiveManagers(spaceId);
    } catch (error) {
      console.error('Erreur lors de la récupération des managers:', error);
      throw error;
    }
  }

  async assignManager(command: AssignManagerCommand): Promise<SpaceMembership> {
    try {
      return await this.service.assignManager(command);
    } catch (error) {
      console.error("Erreur lors de l'assignation de l'administrateur:", error);
      throw error;
    }
  }

  async removeManager(spaceId: string): Promise<SpaceMembership> {
    try {
      return await this.service.removeManager(spaceId);
    } catch (error) {
      console.error("Erreur lors du retrait de l'administrateur:", error);
      throw error;
    }
  }

  listMembers(spaceId: string, page: number, limit: number): Promise<SpaceMembersPage> {
    return this.service.listMembers(spaceId, page, limit);
  }

  addMember(spaceId: string, userId: string): Promise<SpaceMembership> {
    return this.service.addMember(spaceId, userId);
  }

  removeMember(spaceId: string, userId: string): Promise<SpaceMembership> {
    return this.service.removeMember(spaceId, userId);
  }

  async archiveSpace(command: ArchiveSpaceCommand): Promise<void> {
    try {
      await this.service.archiveSpace(command);
    } catch (error) {
      console.error("Erreur lors de l'archivage de l'espace:", error);
      throw error;
    }
  }

  async restoreSpace(command: RestoreSpaceCommand): Promise<void> {
    try {
      await this.service.restoreSpace(command);
    } catch (error) {
      console.error("Erreur lors de la restauration de l'espace:", error);
      throw error;
    }
  }

  async deleteSpace(command: DeleteSpaceCommand): Promise<void> {
    try {
      await this.service.deleteSpace(command);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'espace:", error);
      throw error;
    }
  }

  async moveSpace(command: MoveSpaceCommand): Promise<void> {
    try {
      await this.service.moveSpace(command);
    } catch (error) {
      console.error("Erreur lors du déplacement de l'espace:", error);
      throw error;
    }
  }

  async listActiveUsersForSchool(schoolId: string): Promise<User[]> {
    try {
      const result = await this.usersService.listUsers({
        page: 1,
        limit: 100,
        status: UserStatus.ACTIVE,
        schoolId,
      });
      return [...result.items];
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
      // Fallback sans filtre école si l'API ne le supporte pas encore
      try {
        const result = await this.usersService.listUsers({
          page: 1,
          limit: 100,
          status: UserStatus.ACTIVE,
        });
        return [...result.items];
      } catch {
        throw error;
      }
    }
  }

  formatUserLabel(user: User): string {
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
    return fullName ? `${fullName} (${user.email})` : user.email;
  }

  async loadAllSpaces(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      await this.schoolFacade.loadSchools();
      const schools = this.schoolFacade.schools();
      const schoolNameById = new Map(schools.map((school) => [school.id, school.name]));

      const trees = await Promise.all(
        schools.map(async (school) => {
          try {
            const spaces = await this.service.getSchoolTree(school.id);
            return spaces
              .filter((space) => !space.deletedAt)
              .map((space) => ({ schoolId: school.id, space }));
          } catch (error) {
            console.error(`Impossible de charger les espaces de l'école ${school.id}`, error);
            return [] as { schoolId: string; space: Space }[];
          }
        }),
      );

      const flatSpaces = trees.flat();
      const withManagers = await Promise.all(
        flatSpaces.map(async ({ space }) => {
          let directManager: SpaceMembership | null = null;
          let inheritedManagers: SpaceMembership[] = [];
          try {
            const managers = await this.service.getEffectiveManagers(space.id);
            directManager = managers.directManager;
            inheritedManagers = managers.inheritedManagers;
          } catch (error) {
            console.error(`Impossible de charger les managers de l'espace ${space.id}`, error);
          }

          return {
            ...space,
            schoolName: schoolNameById.get(space.schoolId) ?? 'École inconnue',
            directManagerUserId: directManager?.userId ?? null,
            directManagerLabel: directManager ? userLabel(directManager.user) : null,
            inheritedManagerUserIds: inheritedManagers.map((manager) => manager.userId),
            inheritedManagerLabels: inheritedManagers.map((manager) => userLabel(manager.user)),
          } satisfies SpaceListItem;
        }),
      );

      withManagers.sort((a, b) => {
        const bySchool = a.schoolName.localeCompare(b.schoolName, 'fr');
        if (bySchool !== 0) return bySchool;
        if (a.depth !== b.depth) return a.depth - b.depth;
        return a.name.localeCompare(b.name, 'fr');
      });

      this.spaces.set(withManagers);
    } catch (error) {
      console.error('Erreur lors du chargement des espaces:', error);
      this.error.set('Impossible de charger la liste des espaces.');
      this.spaces.set([]);
    } finally {
      this.isLoading.set(false);
    }
  }
}
