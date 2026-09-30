import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { NotificationService } from '../../../../../shared/components/notification/notification.service';
import { ReplaceAdminForm } from '../../components/replace-admin-form/replace-admin-form';
import { SchoolMembershipFacade } from '../../../application/school-membership.facade';
import { SchoolFacade } from '../../../application/school.facade';
import type { School } from '../../../domain/models/school.model';

@Component({
  imports: [ReplaceAdminForm, MessageModule],
  selector: 'app-replace-admin-page',
  styleUrl: './replace-admin-page.css',
  templateUrl: './replace-admin-page.html',
})
export class ReplaceAdminPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationService);
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
    } catch (error) {
      console.error('Erreur lors du chargement de l\'école:', error);
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

      this.notifications.success(
        'Remplacement effectué',
        `L'administrateur a été remplacé avec succès. L'ancien administrateur a été rétrogradé.`,
      );

      setTimeout(() => {
        this.router.navigate(['/s/schools']);
      }, 2000);
    } catch (error) {
      // Le toast d'erreur est affiché par errorInterceptor.
      console.error('Erreur lors du remplacement:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
