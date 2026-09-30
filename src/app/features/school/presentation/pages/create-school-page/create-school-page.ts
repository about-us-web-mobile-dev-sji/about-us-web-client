import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { NotificationService } from '../../../../../shared/components/notification/notification.service';
import { CreateSchoolForm } from '../../components/create-school-form/create-school-form';
import { SchoolFacade } from '../../../application/school.facade';
import type { CreateSchoolCommand } from '../../../domain/models/school.model';

@Component({
  imports: [CreateSchoolForm, MessageModule],
  selector: 'app-create-school-page',
  styleUrl: './create-school-page.css',
  templateUrl: './create-school-page.html',
})
export class CreateSchoolPage {
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationService);
  private readonly schoolFacade = inject(SchoolFacade);

  isLoading = false;

  async onSchoolSubmit(command: CreateSchoolCommand): Promise<void> {
    this.isLoading = true;

    try {
      const createdSchool = await this.schoolFacade.createSchool(command);

      this.notifications.success(
        'École créée',
        `L'école "${createdSchool.name}" a été enregistrée avec succès.`,
      );

      // Optionnel : Naviguer vers la liste des écoles ou vers la page de détail
      // this.router.navigate(['/schools', createdSchool.id]);

      // Optionnel : Réinitialiser le formulaire
      // this.schoolForm.reset();
    } catch (error) {
      console.error('Erreur lors de la création de l\'école:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
