import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { SchoolFacade } from '../../../application/school.facade';
import type { School } from '../../../domain/models/school.model';
import { SchoolStatus } from '../../../domain/models/school.model';
import { SchoolSpacesChart } from '../../../../spaces/presentation/components/school-spaces-chart/school-spaces-chart';

@Component({
  selector: 'app-school-detail-page',
  imports: [ButtonModule, DatePipe, ProgressSpinnerModule, TagModule, SchoolSpacesChart],
  styleUrl: './school-detail-page.css',
  templateUrl: './school-detail-page.html',
})
export class SchoolDetailPage {
  private readonly schoolFacade = inject(SchoolFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  school = signal<School | null>(null);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    const schoolId = this.route.snapshot.paramMap.get('schoolId');

    if (!schoolId) {
      this.router.navigate(['/s/schools']);
      return;
    }

    this.loadSchoolDetails(schoolId);
  }

  async loadSchoolDetails(schoolId: string): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const school = await this.schoolFacade.getSchoolById(schoolId);
      if (!school) {
        this.errorMessage.set($localize`:@@school-detail-not-found:École introuvable.`);
        return;
      }
      this.school.set(school);
    } catch (error: any) {
      console.error('Erreur lors de la récupération de l\'école:', error);
      this.errorMessage.set(
        $localize`:@@school-detail-load-error:Impossible de charger les détails de l'école.`,
      );
    } finally {
      this.isLoading.set(false);
    }
  }

  goBack(): void {
    this.router.navigate(['/s/schools']);
  }

  getSchoolInitial(name: string): string {
    return (
      name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join('')
        .toUpperCase() || 'E'
    );
  }

  getStatusLabel(status: SchoolStatus): string {
    const labels: Record<SchoolStatus, string> = {
      [SchoolStatus.ACTIVE]: $localize`:@@school-status-active:Active`,
      [SchoolStatus.INACTIVE]: $localize`:@@school-status-inactive:Inactive`,
      [SchoolStatus.PENDING]: $localize`:@@school-status-pending:En attente`,
    };
    return labels[status] || status;
  }

  getStatusSeverity(status: SchoolStatus): 'success' | 'warn' | 'danger' | 'info' {
    const severities: Record<SchoolStatus, 'success' | 'warn' | 'danger' | 'info'> = {
      [SchoolStatus.ACTIVE]: 'success',
      [SchoolStatus.INACTIVE]: 'danger',
      [SchoolStatus.PENDING]: 'warn',
    };
    return severities[status] || 'info';
  }
}