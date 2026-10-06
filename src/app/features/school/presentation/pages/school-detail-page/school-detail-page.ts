import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SchoolFacade } from '../../../application/school.facade';
import type { School } from '../../../domain/models/school.model';
import { SchoolStatus } from '../../../domain/models/school.model';
import { InviteMemberPanel } from '../../components/invite-member-panel/invite-member-panel';
import { SchoolSpacesChart } from '../../../../spaces/presentation/components/school-spaces-chart/school-spaces-chart';

@Component({
  selector: 'app-school-detail-page',
  imports: [ProgressSpinnerModule, ReactiveFormsModule, SchoolSpacesChart, InviteMemberPanel],
  styleUrl: './school-detail-page.css',
  templateUrl: './school-detail-page.html',
})
export class SchoolDetailPage implements OnInit {
  private readonly schoolFacade = inject(SchoolFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  private schoolId: string | null = null;

  school = signal<School | null>(null);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);

  readonly detailForm = this.fb.nonNullable.group({
    name: [{ value: '', disabled: true }],
    status: [{ value: '', disabled: true }],
    createdBy: [{ value: '', disabled: true }],
    createdAt: [{ value: '', disabled: true }],
    updatedAt: [{ value: '', disabled: true }],
  });

  ngOnInit(): void {
    this.schoolId = this.route.snapshot.paramMap.get('schoolId');

    if (!this.schoolId) {
      void this.router.navigate(['/s/schools']);
      return;
    }

    void this.loadSchoolDetails(this.schoolId);
  }

  async loadSchoolDetails(schoolId: string): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const school = await this.schoolFacade.getSchoolById(schoolId);
      this.school.set(school);
      this.patchForm(school);
    } catch (error: unknown) {
      console.error("Erreur lors de la récupération de l'école:", error);
      this.school.set(null);
      this.errorMessage.set(
        $localize`:@@school-detail-load-error:Impossible de charger les détails de l'école.`,
      );
    } finally {
      this.isLoading.set(false);
    }
  }

  retryLoad(): void {
    if (this.schoolId) {
      void this.loadSchoolDetails(this.schoolId);
    }
  }

  goBack(): void {
    void this.router.navigate(['/s/schools']);
  }

  getStatusLabel(status: SchoolStatus): string {
    const labels: Record<SchoolStatus, string> = {
      [SchoolStatus.ACTIVE]: $localize`:@@school-status-active:Active`,
      [SchoolStatus.INACTIVE]: $localize`:@@school-status-inactive:Inactive`,
      [SchoolStatus.SUSPENDED]: $localize`:@@school-status-suspended:Suspendue`,
      [SchoolStatus.BLOCKED]: $localize`:@@school-status-blocked:Bloquée`,
    };
    return labels[status] || status;
  }

  private patchForm(school: School): void {
    this.detailForm.patchValue({
      name: school.name,
      status: school.status ? this.getStatusLabel(school.status) : '—',
      createdBy: school.createdBy?.trim() || '—',
      createdAt:
        school.createdAt.getTime() > 0
          ? school.createdAt.toLocaleString('fr-FR')
          : '—',
      updatedAt:
        school.updatedAt.getTime() > 0
          ? school.updatedAt.toLocaleString('fr-FR')
          : '—',
    });
  }
}
