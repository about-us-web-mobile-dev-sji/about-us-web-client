import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ReplaceAdminForm } from '../../components/replace-admin-form/replace-admin-form';
import { SchoolMembershipFacade } from '../../../application/school-membership.facade';
import { SchoolFacade } from '../../../application/school.facade';
import type { School } from '../../../domain/models/school.model';

@Component({
  imports: [ReplaceAdminForm, MessageModule, ToastModule],
  providers: [MessageService],
  selector: 'app-replace-admin-page',
  styleUrl: './replace-admin-page.css',
  templateUrl: './replace-admin-page.html',
})
export class ReplaceAdminPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly membershipFacade = inject(SchoolMembershipFacade);
  private readonly schoolFacade = inject(SchoolFacade);

  school = signal<School | null>(null);
  isLoading = signal(false);
  isSchoolLoading = signal(true);

  constructor() {
    const schoolId = this.route.snapshot.paramMap.get('schoolId');
    if (schoolId) {
      this.loadSchool(schoolId);
    }
  }

  private async loadSchool(schoolId: string) {
    try {
      const school = await this.schoolFacade.getSchoolById(schoolId);
      this.school.set(school);
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de charger les informations de l\'école.',
        life: 5000,
      });
    } finally {
      this.isSchoolLoading.set(false);
    }
  }

  async onReplaceSubmit(newAdminUserId: string): Promise<void> {
    const schoolId = this.route.snapshot.paramMap.get('schoolId');
    if (!schoolId) return;

    this.isLoading.set(true);

    try {
      const result = await this.membershipFacade.replaceAdministrator(schoolId, {
        newAdminUserId,
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Remplacement effectué',
        detail: `L'administrateur a été remplacé avec succès. L'ancien administrateur a été rétrogradé.`,
        life: 5000,
      });

      setTimeout(() => {
        this.router.navigate(['/s/schools']);
      }, 2000);
    } catch (error: any) {
      console.error('Erreur lors du remplacement:', error);

      let errorMessage = 'Une erreur est survenue lors du remplacement.';

      if (error?.status === 400) {
        errorMessage = 'Les données fournies sont invalides.';
      } else if (error?.status === 404) {
        errorMessage = 'L\'école ou l\'utilisateur spécifié n\'existe pas.';
      } else if (error?.status === 409) {
        errorMessage = 'L\'utilisateur spécifié est déjà administrateur de cette école.';
      } else if (error?.status === 401 || error?.status === 403) {
        errorMessage = 'Vous n\'avez pas les permissions nécessaires.';
      }

      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: errorMessage,
        life: 5000,
      });
    } finally {
      this.isLoading.set(false);
    }
  }
}
