import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SchoolFacade } from '../../../application/school.facade';
import type { CreateSchoolCommand, SchoolSummary } from '../../../domain/models/school.model';
import { CreateSchoolForm } from '../../components/create-school-form/create-school-form';

@Component({
  imports: [CreateSchoolForm, ToastModule],
  providers: [MessageService],
  selector: 'app-edit-school-page',
  styleUrl: './edit-school-page.css',
  templateUrl: './edit-school-page.html',
})
export class EditSchoolPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly facade = inject(SchoolFacade);

  readonly isSubmitting = signal(false);
  readonly isLoading = signal(true);
  school?: SchoolSummary;

  ngOnInit(): void {
    void this.loadSchool();
  }

  private async loadSchool(): Promise<void> {
    // L'école est transmise via history.state quand on clique sur « Modifier » dans la liste.
    const stateSchool = history.state?.['school'] as SchoolSummary | undefined;
    if (stateSchool) {
      this.school = stateSchool;
      this.isLoading.set(false);
      return;
    }

    // Sinon, on la retrouve dans le store (le formulaire n'utilise que des champs existants).
    try {
      await this.facade.loadSchools();
      const id = this.route.snapshot.paramMap.get('schoolId') ?? '';
      this.school = this.facade.schools().find((s) => s.id === id);
    } finally {
      this.isLoading.set(false);
    }
  }

  async onUpdate(command: CreateSchoolCommand): Promise<void> {
    if (!this.school || this.isSubmitting()) return;

    this.isSubmitting.set(true);
    try {
      await this.facade.updateSchool(this.school.id, command);
      this.messageService.add({
        severity: 'success',
        summary: 'École mise à jour',
        detail: `Les informations de "${command.name}" ont été enregistrées.`,
        life: 3500,
      });
      this.goBackToList();
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour de l’école:', error);
      let detail = "Erreur lors de la mise à jour de l'école.";
      if (error?.status === 400) {
        detail = 'Les données fournies sont invalides.';
      } else if (error?.status === 409) {
        detail = 'Une école avec ce nom existe déjà.';
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