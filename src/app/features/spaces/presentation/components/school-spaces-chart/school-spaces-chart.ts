import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { OrganizationChart } from 'primeng/organizationchart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';
import { SpaceFacade } from '../../../application/space.facade';
import { mapSpacesToOrgChartNodes } from '../../../infrastructure/mappers/space-org-chart.mapper';
import type { Space, SpaceEffectiveManagers } from '../../../domain/models/space.model';
import { SpaceKind, SpaceStatus } from '../../../domain/models/space.model';
import type { User } from '../../../../users/domain/models/user.model';

export interface SpaceManagerInfo {
  directUserId: string | null;
  directLabel: string | null;
  inheritedLabels: string[];
}

interface UserOption {
  id: string;
  label: string;
}

@Component({
  selector: 'app-school-spaces-chart',
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    MessageModule,
    OrganizationChart,
    ProgressSpinnerModule,
    SelectModule,
  ],
  styleUrl: './school-spaces-chart.css',
  templateUrl: './school-spaces-chart.html',
})
export class SchoolSpacesChart {
  private readonly spaceFacade = inject(SpaceFacade);

  schoolId = input.required<string>();
  schoolName = input.required<string>();

  isLoading = signal(false);
  isEnsuringRoot = signal(false);
  isCreating = signal(false);
  isAssigningManager = signal(false);
  isMutatingSpace = signal(false);
  errorMessage = signal<string | null>(null);
  spaces = signal<Space[]>([]);
  managersBySpaceId = signal<Record<string, SpaceManagerInfo>>({});
  userOptions = signal<UserOption[]>([]);

  parentForCreate = signal<Space | null>(null);
  newSpaceName = signal('');
  newSpaceDescription = signal('');
  newSpaceAdminUserId = signal<string | null>(null);

  spaceForAssignAdmin = signal<Space | null>(null);
  assignAdminUserId = signal<string | null>(null);

  spaceForMove = signal<Space | null>(null);
  newParentId = signal<string | null>(null);
  isMoving = signal(false);

  orgChartNodes = computed(() => mapSpacesToOrgChartNodes(this.spaces()));

  moveParentOptions = computed(() => {
    const moving = this.spaceForMove();
    if (!moving) {
      return [] as { id: string; label: string }[];
    }
    return this.spaces()
      .filter((candidate) => this.isValidMoveTarget(moving, candidate))
      .map((candidate) => ({
        id: candidate.id,
        label: `${'— '.repeat(Math.min(candidate.depth, 4))}${candidate.name}`,
      }));
  });

  constructor() {
    effect(() => {
      const schoolId = this.schoolId();
      if (schoolId) {
        void this.bootstrap(schoolId);
      }
    });
  }

  async bootstrap(schoolId: string): Promise<void> {
    await this.loadUsers(schoolId);
    await this.loadTree(schoolId);
  }

  async loadTree(schoolId: string): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const spaces = await this.spaceFacade.getSchoolTree(schoolId);
      this.spaces.set(spaces);
      await this.loadManagers(spaces);
    } catch {
      this.errorMessage.set(
        $localize`:@@spaces-load-error:Impossible de charger l'arborescence des espaces.`,
      );
      this.spaces.set([]);
      this.managersBySpaceId.set({});
    } finally {
      this.isLoading.set(false);
    }
  }

  async ensureRoot(): Promise<void> {
    this.isEnsuringRoot.set(true);
    this.errorMessage.set(null);

    try {
      await this.spaceFacade.ensureSchoolRoot({
        schoolId: this.schoolId(),
        name: this.schoolName(),
      });
      await this.loadTree(this.schoolId());
    } catch {
      this.errorMessage.set(
        $localize`:@@spaces-ensure-root-error:Impossible d'initialiser l'espace racine.`,
      );
    } finally {
      this.isEnsuringRoot.set(false);
    }
  }

  openCreateChild(space: Space): void {
    if (space.status === SpaceStatus.ARCHIVED || space.deletedAt) {
      return;
    }
    this.spaceForAssignAdmin.set(null);
    this.spaceForMove.set(null);
    this.parentForCreate.set(space);
    this.newSpaceName.set('');
    this.newSpaceDescription.set('');
    this.newSpaceAdminUserId.set(null);
    this.errorMessage.set(null);
  }

  cancelCreate(): void {
    this.parentForCreate.set(null);
    this.newSpaceName.set('');
    this.newSpaceDescription.set('');
    this.newSpaceAdminUserId.set(null);
  }

  async submitCreate(): Promise<void> {
    const parent = this.parentForCreate();
    const name = this.newSpaceName().trim();
    if (!parent || !name) {
      return;
    }

    this.isCreating.set(true);
    this.errorMessage.set(null);

    try {
      const created = await this.spaceFacade.createSpace({
        parentId: parent.id,
        name,
        description: this.newSpaceDescription().trim() || null,
      });

      const adminUserId = this.newSpaceAdminUserId();
      if (adminUserId) {
        try {
          await this.spaceFacade.assignManager({
            spaceId: created.id,
            userId: adminUserId,
          });
        } catch {
          this.cancelCreate();
          await this.loadTree(this.schoolId());
          this.errorMessage.set(
            $localize`:@@spaces-create-admin-partial-error:Espace créé, mais l'administrateur n'a pas pu être assigné.`,
          );
          return;
        }
      }

      this.cancelCreate();
      await this.loadTree(this.schoolId());
    } catch {
      this.errorMessage.set(
        $localize`:@@spaces-create-error:Impossible de créer le sous-espace.`,
      );
    } finally {
      this.isCreating.set(false);
    }
  }

  openAssignAdmin(space: Space): void {
    if (!this.canManageAdmin(space) || this.hasDirectManager(space)) {
      return;
    }
    this.parentForCreate.set(null);
    this.spaceForMove.set(null);
    this.spaceForAssignAdmin.set(space);
    this.assignAdminUserId.set(null);
    this.errorMessage.set(null);
  }

  cancelAssignAdmin(): void {
    this.spaceForAssignAdmin.set(null);
    this.assignAdminUserId.set(null);
  }

  async submitAssignAdmin(): Promise<void> {
    const space = this.spaceForAssignAdmin();
    const userId = this.assignAdminUserId();
    if (!space || !userId) {
      return;
    }

    this.isAssigningManager.set(true);
    this.errorMessage.set(null);

    try {
      await this.spaceFacade.assignManager({
        spaceId: space.id,
        userId,
      });
      this.cancelAssignAdmin();
      await this.loadTree(this.schoolId());
    } catch {
      this.errorMessage.set(
        $localize`:@@spaces-assign-admin-error:Impossible d'assigner l'administrateur.`,
      );
    } finally {
      this.isAssigningManager.set(false);
    }
  }

  async removeAdmin(space: Space): Promise<void> {
    if (!this.hasDirectManager(space)) {
      return;
    }

    this.isAssigningManager.set(true);
    this.errorMessage.set(null);

    try {
      await this.spaceFacade.removeManager(space.id);
      await this.loadTree(this.schoolId());
    } catch {
      this.errorMessage.set(
        $localize`:@@spaces-remove-admin-error:Impossible de retirer l'administrateur.`,
      );
    } finally {
      this.isAssigningManager.set(false);
    }
  }

  async archiveSpace(space: Space): Promise<void> {
    if (space.status !== SpaceStatus.ACTIVE || space.deletedAt) {
      return;
    }
    this.isMutatingSpace.set(true);
    this.errorMessage.set(null);
    try {
      await this.spaceFacade.archiveSpace({ spaceId: space.id });
      await this.loadTree(this.schoolId());
    } catch {
      this.errorMessage.set(
        $localize`:@@spaces-archive-error:Impossible d'archiver l'espace.`,
      );
    } finally {
      this.isMutatingSpace.set(false);
    }
  }

  async restoreSpace(space: Space): Promise<void> {
    if (space.status !== SpaceStatus.ARCHIVED) {
      return;
    }
    this.isMutatingSpace.set(true);
    this.errorMessage.set(null);
    try {
      await this.spaceFacade.restoreSpace({ spaceId: space.id });
      await this.loadTree(this.schoolId());
    } catch {
      this.errorMessage.set(
        $localize`:@@spaces-restore-error:Impossible de restaurer l'espace.`,
      );
    } finally {
      this.isMutatingSpace.set(false);
    }
  }

  async deleteSpace(space: Space): Promise<void> {
    if (this.isSchoolRoot(space) || space.deletedAt) {
      return;
    }
    this.isMutatingSpace.set(true);
    this.errorMessage.set(null);
    try {
      await this.spaceFacade.deleteSpace({ spaceId: space.id, recursive: true });
      await this.loadTree(this.schoolId());
    } catch {
      this.errorMessage.set(
        $localize`:@@spaces-delete-error:Impossible de supprimer l'espace.`,
      );
    } finally {
      this.isMutatingSpace.set(false);
    }
  }

  openMove(space: Space): void {
    if (!this.canMove(space)) {
      return;
    }
    this.parentForCreate.set(null);
    this.spaceForAssignAdmin.set(null);
    this.spaceForMove.set(space);
    this.newParentId.set(null);
    this.errorMessage.set(null);
  }

  cancelMove(): void {
    this.spaceForMove.set(null);
    this.newParentId.set(null);
  }

  async submitMove(): Promise<void> {
    const space = this.spaceForMove();
    const newParentId = this.newParentId();
    if (!space || !newParentId) {
      return;
    }

    this.isMoving.set(true);
    this.errorMessage.set(null);

    try {
      await this.spaceFacade.moveSpace({
        spaceId: space.id,
        newParentId,
      });
      this.cancelMove();
      await this.loadTree(this.schoolId());
    } catch {
      this.errorMessage.set(
        $localize`:@@spaces-move-error:Impossible de déplacer l'espace.`,
      );
    } finally {
      this.isMoving.set(false);
    }
  }

  canAddChild(space: Space): boolean {
    return space.status === SpaceStatus.ACTIVE && !space.deletedAt;
  }

  canManageAdmin(space: Space): boolean {
    return space.status === SpaceStatus.ACTIVE && !space.deletedAt;
  }

  canMove(space: Space): boolean {
    return (
      !this.isSchoolRoot(space) &&
      space.status === SpaceStatus.ACTIVE &&
      !space.deletedAt
    );
  }

  /** Nouveau parent: même école, pas soi-même, pas un descendant, actif. */
  isValidMoveTarget(moving: Space, candidate: Space): boolean {
    if (candidate.deletedAt || candidate.status !== SpaceStatus.ACTIVE) {
      return false;
    }
    if (candidate.schoolId !== moving.schoolId) {
      return false;
    }
    if (candidate.id === moving.id) {
      return false;
    }
    if (candidate.id === moving.parentId) {
      return false;
    }
    if (this.isDescendantPath(candidate.path, moving.path)) {
      return false;
    }
    return true;
  }

  private isDescendantPath(candidatePath: string, ancestorPath: string): boolean {
    return candidatePath === ancestorPath || candidatePath.startsWith(`${ancestorPath}/`);
  }

  hasDirectManager(space: Space): boolean {
    return !!this.managersBySpaceId()[space.id]?.directUserId;
  }

  getManagerInfo(space: Space): SpaceManagerInfo | null {
    return this.managersBySpaceId()[space.id] ?? null;
  }

  getSpaceInitials(space: Space): string {
    const parts = space.name
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (parts.length === 0) {
      return '?';
    }
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
  }

  getAdminSubtitle(space: Space): string {
    const manager = this.getManagerInfo(space);
    if (!manager) {
      return $localize`:@@spaces-no-admin:Pas d'admin`;
    }
    if (manager.directLabel) {
      return this.shortAdminLabel(manager.directLabel);
    }
    if (manager.inheritedLabels.length) {
      const label = this.shortAdminLabel(manager.inheritedLabels[0]);
      return $localize`:@@spaces-admin-inherited:Hérité · ${label}:label:`;
    }
    return $localize`:@@spaces-no-admin:Pas d'admin`;
  }

  isSchoolRoot(space: Space): boolean {
    return space.kind === SpaceKind.SCHOOL_ROOT;
  }

  private shortAdminLabel(label: string): string {
    const withoutEmail = label.replace(/\s*\([^)]*@[^)]*\)\s*$/, '').trim();
    return withoutEmail || label;
  }

  private async loadUsers(schoolId: string): Promise<void> {
    try {
      const users = await this.spaceFacade.listActiveUsersForSchool(schoolId);
      this.userOptions.set(users.map((user) => this.toUserOption(user)));
    } catch {
      this.userOptions.set([]);
    }
  }

  private async loadManagers(spaces: Space[]): Promise<void> {
    const entries = await Promise.all(
      spaces.map(async (space) => {
        try {
          const managers = await this.spaceFacade.getEffectiveManagers(space.id);
          return [space.id, this.toManagerInfo(managers)] as const;
        } catch {
          return [
            space.id,
            { directUserId: null, directLabel: null, inheritedLabels: [] } satisfies SpaceManagerInfo,
          ] as const;
        }
      }),
    );

    this.managersBySpaceId.set(Object.fromEntries(entries));
  }

  private toManagerInfo(managers: SpaceEffectiveManagers): SpaceManagerInfo {
    const options = this.userOptions();
    const labelFor = (userId: string): string => {
      const match = options.find((option) => option.id === userId);
      if (match) {
        return match.label;
      }
      return userId.length > 12 ? `${userId.slice(0, 8)}…` : userId;
    };

    return {
      directUserId: managers.directManager?.userId ?? null,
      directLabel: managers.directManager ? labelFor(managers.directManager.userId) : null,
      inheritedLabels: managers.inheritedManagers.map((manager) => labelFor(manager.userId)),
    };
  }

  private toUserOption(user: User): UserOption {
    return {
      id: user.id,
      label: this.spaceFacade.formatUserLabel(user),
    };
  }
}
