import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SchoolFacade } from '../../../application/school.facade';
import {
  SchoolStatus,
  type CreateSchoolCommand,
  type SchoolSummary,
} from '../../../domain/models/school.model';

@Component({
  imports: [ReactiveFormsModule, ToastModule],
  providers: [MessageService],
  selector: 'app-schools-list-page',
  styleUrl: './schools-list-page.css',
  templateUrl: './schools-list-page.html',
})
export class SchoolsListPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  protected readonly facade = inject(SchoolFacade);

  /** Exposé pour utilisation dans le template. */
  protected readonly SchoolStatus = SchoolStatus;

  /** Ouvre/ferme le modal (ajout ou modification). */
  readonly showCreateDialog = signal(false);
  /** École en cours de modification (null = mode création). */
  readonly editingSchool = signal<SchoolSummary | null>(null);
  /** Affiché dans le bouton du modal pendant l'enregistrement. */
  readonly isCreating = signal(false);

  readonly createForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    city: [''],
    country: [''],
    email: ['', [Validators.email]],
  });

  get nameControl() {
    return this.createForm.controls.name;
  }

  get cityControl() {
    return this.createForm.controls.city;
  }

  get countryControl() {
    return this.createForm.controls.country;
  }

  get emailControl() {
    return this.createForm.controls.email;
  }

  ngOnInit(): void {
    void this.facade.loadSchools();
  }

  openCreateDialog(): void {
    this.editingSchool.set(null);
    this.createForm.reset();
    this.showCreateDialog.set(true);
  }

  closeCreateDialog(): void {
    this.showCreateDialog.set(false);
    this.editingSchool.set(null);
  }

  openEditDialog(school: SchoolSummary): void {
    this.editingSchool.set(school);
    this.createForm.reset({
      name: school.name ?? '',
      city: school.city ?? '',
      country: school.country ?? '',
      email: school.email ?? '',
    });
    this.showCreateDialog.set(true);
  }

  async onCreateSubmit(): Promise<void> {
    if (this.isCreating()) return;
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const value = this.createForm.getRawValue();
    const command: CreateSchoolCommand = { name: value.name.trim() };
    if (value.city.trim()) command.city = value.city.trim();
    if (value.country.trim()) command.country = value.country.trim();
    if (value.email.trim()) command.email = value.email.trim();

    const schoolToEdit = this.editingSchool();
    this.isCreating.set(true);
    try {
      if (schoolToEdit) {
        const updated = await this.facade.updateSchool(schoolToEdit.id, command);
        this.showToast(
          'success',
          'École modifiée !',
          `"${updated.name}" a été mis à jour.`,
        );
      } else {
        const createdSchool = await this.facade.createSchool(command);
        this.showToast(
          'success',
          'Établissement créé !',
          `"${createdSchool.name}" a été enregistré.`,
        );
      }
      this.closeCreateDialog();
      // Recharge la liste pour afficher les changements dans le tableau.
      await this.facade.loadSchools();
    } catch (error: any) {
      console.error("Erreur lors de l'enregistrement de l'école:", error);
      const action = schoolToEdit ? 'la modification' : 'la création';
      let detail = `Erreur lors de ${action} de l'école.`;
      if (error?.status === 400) {
        detail = 'Les données fournies sont invalides.';
      } else if (error?.status === 409) {
        detail = 'Une école avec ce nom existe déjà.';
      }
      this.showToast('error', 'Erreur', detail);
    } finally {
      this.isCreating.set(false);
    }
  }

  async toggleStatus(school: SchoolSummary): Promise<void> {
    try {
      const updated = await this.facade.toggleBlock(school);
      const nowBlocked = updated.status === SchoolStatus.BLOCKED;
      this.showToast(
        nowBlocked ? 'warn' : 'success',
        nowBlocked ? 'École bloquée' : 'École débloquée',
        `Le statut de "${updated.name}" a été mis à jour.`,
      );
    } catch {
      this.showToast('error', 'Erreur', 'Échec de la mise à jour du statut.');
    }
  }

  protected statusLabel(status: SchoolStatus): string {
    switch (status) {
      case SchoolStatus.BLOCKED:
        return 'BLOQUÉE';
      case SchoolStatus.ACTIVE:
        return 'ACTIVE';
      case SchoolStatus.SUSPENDED:
        return 'SUSPENDUE';
      case SchoolStatus.INACTIVE:
        return 'INACTIVE';
    }
  }

  private showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, life: 3500 });
  }
}