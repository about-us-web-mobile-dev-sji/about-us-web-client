import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CreateSchoolForm } from '../../components/create-school-form/create-school-form';
import { SchoolFacade } from '../../../application/school.facade';
import type { CreateSchoolCommand } from '../../../domain/models/school.model';

@Component({
  imports: [CreateSchoolForm, MessageModule, ToastModule],
  providers: [MessageService],
  selector: 'app-create-school-page',
  styleUrl: './create-school-page.css',
  templateUrl: './create-school-page.html',
})
export class CreateSchoolPage {
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly schoolFacade = inject(SchoolFacade);

  isLoading = false;

  async onSchoolSubmit(command: CreateSchoolCommand): Promise<void> {
    this.isLoading = true;

    try {
      const createdSchool = await this.schoolFacade.createSchool(command);

      this.messageService.add({
        severity: 'success',
        summary: 'École créée',
        detail: `L'école "${createdSchool.name}" a été enregistrée avec succès.`,
        life: 5000,
      });

      // Optionnel : Naviguer vers la liste des écoles ou vers la page de détail
      // this.router.navigate(['/schools', createdSchool.id]);

      // Optionnel : Réinitialiser le formulaire
      // this.schoolForm.reset();
    } catch (error: any) {
      console.error('Erreur lors de la création de l\'école:', error);

      let errorMessage = 'Une erreur est survenue lors de la création de l\'école.';

      if (error?.status === 400) {
        errorMessage = 'Les données fournies sont invalides.';
      } else if (error?.status === 409) {
        errorMessage = 'Une école avec ce code existe déjà.';
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
      this.isLoading = false;
    }
  }
}
