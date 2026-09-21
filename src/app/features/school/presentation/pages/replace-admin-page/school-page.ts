import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SchoolFacade } from '../../../application/school.facade';
import { SchoolMembershipFacade } from '../../../application/school-membership.facade';
import { ReplaceAdminForm } from '../../components/replace-admin-form/replace-admin-form';

@Component({
  imports: [ReplaceAdminForm, ToastModule],
  providers: [MessageService],
  selector: 'app-replace-admin-page',
  styleUrl: './school-page.css',
  templateUrl: './school-page.html',
})
export class ReplaceAdminPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly schoolFacade = inject(SchoolFacade);
  private readonly membershipFacade = inject(SchoolMembershipFacade);

  readonly isLoading = signal(true);
  readonly isSubmitting = signal(false);

  schoolName = '';
  schoolId = '';

  async ngOnInit(): Promise<void> {
    const schoolId = this.route.snapshot.paramMap.get('schoolId') ?? '';
    this.schoolId = schoolId;

    try {
      const school = await this.schoolFacade.getSchoolById(schoolId);
      if (school) {
        this.schoolName = school.name ?? schoolId;
      }
    } finally {
      this.isLoading.set(false);
    }
  }

  async onReplace(newAdminUserId: string): Promise<void> {
    if (!this.schoolId || this.isSubmitting()) return;

    this.isSubmitting.set(true);
    try {
      await this.membershipFacade.replaceAdministrator(this.schoolId, {
        newAdminUserId,
      });
      this.messageService.add({
        severity: 'success',
        summary: 'Administrateur remplacé',
        detail: `Le nouvel administrateur a été défini pour "${this.schoolName}".`,
        life: 3500,
      });
      this.goBackToList();
    } catch (error: any) {
      console.error('Erreur lors du remplacement:', error);
      let detail = 'Erreur lors du remplacement de l’administrateur.';
      if (error?.status === 404) {
        detail = 'Utilisateur ou école introuvable.';
      }
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail, life: 3500 });
    } finally {
      this.isSubmitting.set(false);
    }
  }

  goBackToList(): void {
    void this.router.navigate(['/s/schools']);
  }
}