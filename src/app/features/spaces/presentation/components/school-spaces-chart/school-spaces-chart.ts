import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { OrganizationChart } from 'primeng/organizationchart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { SpaceFacade } from '../../../application/space.facade';
import { mapSpacesToOrgChartNodes } from '../../../infrastructure/mappers/space-org-chart.mapper';
import type { Space } from '../../../domain/models/space.model';
import { SpaceKind, SpaceStatus } from '../../../domain/models/space.model';

@Component({
  selector: 'app-school-spaces-chart',
  imports: [ButtonModule, MessageModule, OrganizationChart, ProgressSpinnerModule, TagModule],
  styleUrl: './school-spaces-chart.css',
  templateUrl: './school-spaces-chart.html',
})
export class SchoolSpacesChart {
  private readonly spaceFacade = inject(SpaceFacade);

  schoolId = input.required<string>();
  schoolName = input.required<string>();

  isLoading = signal(false);
  isEnsuringRoot = signal(false);
  errorMessage = signal<string | null>(null);
  spaces = signal<Space[]>([]);

  orgChartNodes = computed(() => mapSpacesToOrgChartNodes(this.spaces()));

  constructor() {
    effect(() => {
      const schoolId = this.schoolId();
      if (schoolId) {
        void this.loadTree(schoolId);
      }
    });
  }

  async loadTree(schoolId: string): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const spaces = await this.spaceFacade.getSchoolTree(schoolId);
      this.spaces.set(spaces);
    } catch {
      this.errorMessage.set(
        $localize`:@@spaces-load-error:Impossible de charger l'arborescence des espaces.`,
      );
      this.spaces.set([]);
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

  getMemberLabel(space: Space): string | null {
    if (!space.memberDesignation) {
      return null;
    }
    return space.memberDesignation.plural;
  }

  getStatusLabel(status: SpaceStatus): string {
    return status === SpaceStatus.ARCHIVED
      ? $localize`:@@spaces-status-archived:Archivé`
      : $localize`:@@spaces-status-active:Actif`;
  }

  getStatusSeverity(status: SpaceStatus): 'success' | 'warn' {
    return status === SpaceStatus.ARCHIVED ? 'warn' : 'success';
  }

  isSchoolRoot(space: Space): boolean {
    return space.kind === SpaceKind.SCHOOL_ROOT;
  }
}
