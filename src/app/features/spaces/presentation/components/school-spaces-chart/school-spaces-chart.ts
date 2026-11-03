import { CardModule } from 'primeng/card';
import { NotifyService } from '../../../../../core/notifications/notify.service';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { MenuItem } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { Menu, MenuModule } from 'primeng/menu';
import { Component, computed, effect, inject, input, signal, viewChild, DestroyRef, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
import { userLabel } from '../../../../../shared/users/user-summary';

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
    AvatarModule,
    CardModule,
    DialogModule,
    TextareaModule,
    MenuModule,
    TooltipModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    MessageModule,
    OrganizationChart,
    ProgressSpinnerModule,
    SelectModule,
  ],
  templateUrl: './school-spaces-chart.html',
})
export class SchoolSpacesChart {
  private readonly spaceFacade = inject(SpaceFacade);
  private readonly notify = inject(NotifyService);

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
      this.notifyActionError(
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
          this.notifyActionError(
            $localize`:@@spaces-create-admin-partial-error:Espace créé, mais l'administrateur n'a pas pu être assigné.`,
          );
          return;
        }
      }

      this.cancelCreate();
      await this.loadTree(this.schoolId());
    } catch {
      this.notifyActionError(
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
      this.notifyActionError(
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
      this.notifyActionError(
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
      this.notifyActionError(
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
      this.notifyActionError(
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
      this.notifyActionError(
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
      this.notifyActionError(
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

  // ---------- Zoom de l'organigramme ----------
  readonly minZoom = 0.3;
  readonly maxZoom = 1.5;
  /** Plancher de l'ajustement automatique : en dessous, le texte devient illisible ; on fait défiler à la place. */
  private readonly autoFitMinZoom = 0.5;
  /** Échelle appliquée à l'arbre. */
  readonly zoom = signal(1);
  /** Tant qu'il est actif, l'arbre se réduit automatiquement pour tenir dans la largeur disponible. */
  readonly autoFit = signal(true);
  readonly zoomPercent = computed(() => Math.round(this.zoom() * 100));
  private readonly naturalSize = signal({ width: 0, height: 0 });
  private readonly viewportWidth = signal(0);
  readonly scaledWidth = computed(() => Math.ceil(this.naturalSize().width * this.zoom()));
  readonly scaledHeight = computed(() => Math.ceil(this.naturalSize().height * this.zoom()));

  private readonly chartViewport = viewChild<ElementRef<HTMLElement>>('chartViewport');
  private readonly chartCanvas = viewChild<ElementRef<HTMLElement>>('chartCanvas');

  private readonly resizeObserver =
    typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(() => this.measureChart());

  private readonly observeChart = effect((onCleanup) => {
    const viewport = this.chartViewport()?.nativeElement;
    const canvas = this.chartCanvas()?.nativeElement;
    if (!viewport || !canvas || !this.resizeObserver) return;
    this.resizeObserver.observe(viewport);
    this.resizeObserver.observe(canvas);
    this.measureChart();
    onCleanup(() => this.resizeObserver?.disconnect());
  });

  private readonly applyAutoFit = effect(() => {
    if (!this.autoFit()) return;
    const { width } = this.naturalSize();
    const available = this.viewportWidth();
    if (!width || !available) return;
    // On ne grossit jamais au-delà de 100 % : l'ajustement sert à faire tenir un grand arbre.
    this.zoom.set(Math.max(this.autoFitMinZoom, Math.min(1, available / width)));
    // Si l'arbre déborde encore, on centre le défilement sur la racine (en haut au milieu).
    requestAnimationFrame(() => {
      const viewport = this.chartViewport()?.nativeElement;
      if (viewport && viewport.scrollWidth > viewport.clientWidth) {
        viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
      }
    });
  });

  private readonly stopObserving = inject(DestroyRef).onDestroy(() => this.resizeObserver?.disconnect());

  // ---------- Hauteur de la carte : fixe, tout l'espace jusqu'au bas de la zone de contenu ----------
  // L'arbre défile à l'intérieur de la carte (barres visibles) ; la page, elle, ne défile pas.
  private readonly chartCard = viewChild('chartCard', { read: ElementRef<HTMLElement> });
  /** Hauteur de la carte, en px (au moins 24rem). */
  readonly cardHeight = signal(384);

  private readonly fillHeight = effect((onCleanup) => {
    const card = this.chartCard()?.nativeElement;
    if (!card || typeof window === 'undefined') return;
    const update = () => {
      const container = this.scrollContainerOf(card);
      const bottom = container
        ? container.getBoundingClientRect().bottom - parseFloat(getComputedStyle(container).paddingBottom)
        : window.innerHeight;
      // La position de la carte dans son conteneur, indépendante du défilement en cours.
      const top = card.getBoundingClientRect().top + (container?.scrollTop ?? 0);
      this.cardHeight.set(Math.max(384, Math.floor(bottom - top)));
    };
    requestAnimationFrame(update);
    window.addEventListener('resize', update);
    onCleanup(() => window.removeEventListener('resize', update));
  });

  private scrollContainerOf(element: HTMLElement): HTMLElement | null {
    for (let parent = element.parentElement; parent; parent = parent.parentElement) {
      const overflow = getComputedStyle(parent).overflowY;
      if (overflow === 'auto' || overflow === 'scroll') return parent;
    }
    return null;
  }

  zoomBy(step: number): void {
    this.autoFit.set(false);
    this.zoom.set(this.clampZoom(Math.round((this.zoom() + step) * 10) / 10));
  }

  fitToWidth(): void {
    this.autoFit.set(true);
  }

  /** Ctrl (ou ⌘) + molette : zoom manuel, sans faire défiler la page. */
  onWheel(event: WheelEvent): void {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    this.zoomBy(event.deltaY < 0 ? 0.1 : -0.1);
  }

  // ---------- Glisser pour déplacer, dans les deux sens ----------
  readonly isPanning = signal(false);
  private readonly viewportHeight = signal(0);
  readonly canPan = computed(
    () => this.scaledWidth() > this.viewportWidth() || this.scaledHeight() > this.viewportHeight(),
  );
  private panStartX = 0;
  private panStartY = 0;
  private panStartScroll = 0;
  private panStartScrollTop = 0;

  // ---------- Ouvrir un espace (clic sur un nœud, mais pas à la fin d'un glissé) ----------
  private readonly router = inject(Router);
  private pointerDownAt = { x: 0, y: 0 };

  openSpace(space: Space, event: Event): void {
    if (event instanceof MouseEvent && Math.hypot(event.clientX - this.pointerDownAt.x, event.clientY - this.pointerDownAt.y) > 5) return;
    void this.router.navigate(['/s/schools', this.schoolId(), 'spaces', space.id]);
  }

  startPan(event: PointerEvent): void {
    this.pointerDownAt = { x: event.clientX, y: event.clientY };
    const viewport = this.chartViewport()?.nativeElement;
    // Les boutons et menus des nœuds gardent leur comportement normal.
    if (!viewport || !this.canPan() || event.button !== 0 || (event.target as HTMLElement).closest('button, a')) return;
    this.isPanning.set(true);
    this.panStartX = event.clientX;
    this.panStartScroll = viewport.scrollLeft;
    this.panStartY = event.clientY;
    this.panStartScrollTop = viewport.scrollTop;
    viewport.setPointerCapture(event.pointerId);
  }

  pan(event: PointerEvent): void {
    const viewport = this.chartViewport()?.nativeElement;
    if (!this.isPanning() || !viewport) return;
    viewport.scrollLeft = this.panStartScroll - (event.clientX - this.panStartX);
    viewport.scrollTop = this.panStartScrollTop - (event.clientY - this.panStartY);
  }

  endPan(event: PointerEvent): void {
    if (!this.isPanning()) return;
    this.isPanning.set(false);
    this.chartViewport()?.nativeElement.releasePointerCapture(event.pointerId);
  }

  private measureChart(): void {
    const viewport = this.chartViewport()?.nativeElement;
    const canvas = this.chartCanvas()?.nativeElement;
    if (!viewport || !canvas) return;
    // offsetWidth/Height ignorent le transform : c'est la taille réelle de l'arbre à 100 %.
    this.naturalSize.set({ width: canvas.offsetWidth, height: canvas.offsetHeight });
    this.viewportWidth.set(viewport.clientWidth);
    this.viewportHeight.set(viewport.clientHeight);
  }

  private clampZoom(value: number): number {
    return Math.min(this.maxZoom, Math.max(this.minZoom, value));
  }

  readonly nodeMenu = viewChild.required<Menu>('nodeMenu');
  nodeMenuItems: MenuItem[] = [];

  /** Menu d'actions d'un nœud : remplace la rangée de boutons sous chaque carte. */
  openNodeMenu(event: Event, space: Space): void {
    const items: MenuItem[] = [];
    if (this.canAddChild(space)) {
      items.push({ label: $localize`:@@spaces-add-child-title:Ajouter un sous-espace`, icon: 'pi pi-plus', command: () => this.openCreateChild(space) });
    }
    if (this.canManageAdmin(space) && !this.hasDirectManager(space)) {
      items.push({ label: $localize`:@@spaces-add-admin-title:Assigner un administrateur`, icon: 'pi pi-user-plus', command: () => this.openAssignAdmin(space) });
    }
    if (this.canManageAdmin(space) && this.hasDirectManager(space)) {
      items.push({ label: $localize`:@@spaces-remove-admin-title:Retirer l'administrateur`, icon: 'pi pi-user-minus', disabled: this.isAssigningManager(), command: () => void this.removeAdmin(space) });
    }
    if (this.canMove(space)) {
      items.push({ label: $localize`:@@spaces-move-title:Déplacer le sous-arbre`, icon: 'pi pi-arrows-alt', disabled: this.isMoving(), command: () => this.openMove(space) });
    }
    const lifecycle: MenuItem[] = [];
    if (space.status === SpaceStatus.ACTIVE && !space.deletedAt) {
      lifecycle.push({ label: $localize`:@@spaces-archive-title:Archiver l'espace`, icon: 'pi pi-inbox', disabled: this.isMutatingSpace(), command: () => void this.archiveSpace(space) });
    }
    if (space.status === SpaceStatus.ARCHIVED) {
      lifecycle.push({ label: $localize`:@@spaces-restore-title:Restaurer l'espace`, icon: 'pi pi-replay', disabled: this.isMutatingSpace(), command: () => void this.restoreSpace(space) });
    }
    if (!this.isSchoolRoot(space) && !space.deletedAt) {
      lifecycle.push({ label: $localize`:@@spaces-delete-title:Supprimer l'espace`, icon: 'pi pi-trash', styleClass: 'au-menu-danger', disabled: this.isMutatingSpace(), command: () => void this.deleteSpace(space) });
    }
    if (items.length && lifecycle.length) items.push({ separator: true });
    this.nodeMenuItems = [...items, ...lifecycle];
    this.nodeMenu().toggle(event);
  }

  /** Racine en bleu marque, espace avec administrateur en vert succès, sinon neutre. */
  avatarClass(space: Space): string {
    if (this.isSchoolRoot(space)) return 'bg-primary! text-primary-contrast! font-semibold';
    if (this.hasDirectManager(space)) return 'bg-(--p-au-success-soft)! text-(--p-au-success)! font-semibold';
    return 'bg-(--au-panel)! text-color! font-semibold';
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
    return {
      directUserId: managers.directManager?.userId ?? null,
      directLabel: managers.directManager ? userLabel(managers.directManager.user) : null,
      inheritedLabels: managers.inheritedManagers.map((manager) => userLabel(manager.user)),
    };
  }

  private toUserOption(user: User): UserOption {
    return {
      id: user.id,
      label: this.spaceFacade.formatUserLabel(user),
    };
  }

  /** Les erreurs d'action passent en popup ; seul l'échec de chargement de l'arbre reste sur la page. */
  private notifyActionError(message: string): void {
    this.notify.error('Action impossible', message);
  }
}
