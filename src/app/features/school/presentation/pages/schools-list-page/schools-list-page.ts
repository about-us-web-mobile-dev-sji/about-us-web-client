import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, model, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { SchoolFacade } from '../../../application/school.facade';
import {
  SchoolStatus,
  type CreateSchoolCommand,
  type SchoolSummary,
} from '../../../domain/models/school.model';

@Component({
  imports: [
    ButtonModule,
    DatePipe,
    Drawer,
    ReactiveFormsModule,
    TableModule,
    TagModule,
    ToastModule,
  ],
  providers: [MessageService],
  selector: 'app-schools-list-page',
  styleUrl: './schools-list-page.css',
  templateUrl: './schools-list-page.html',
})
export class SchoolsListPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  protected readonly facade = inject(SchoolFacade);

  protected readonly SchoolStatus = SchoolStatus;

  readonly showCreateDialog = signal(false);
  readonly isCreating = signal(false);
  readonly optionsOpen = model(false);
  readonly selectedSchool = signal<SchoolSummary | null>(null);

  readonly createForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    /** Optional: the backend invites this address as the school administrator (UC-16). */
    adminEmail: ['', [Validators.email, Validators.maxLength(320)]],
  });

  get nameControl() {
    return this.createForm.controls.name;
  }

  get adminEmailControl() {
    return this.createForm.controls.adminEmail;
  }

  ngOnInit(): void {
    void this.facade.loadSchools();
  }

  openCreateDialog(): void {
    this.createForm.reset();
    this.showCreateDialog.set(true);
  }

  closeCreateDialog(): void {
    this.showCreateDialog.set(false);
  }

  openOptions(school: SchoolSummary): void {
    this.selectedSchool.set(school);
    this.optionsOpen.set(true);
  }

  closeOptions(): void {
    this.optionsOpen.set(false);
    this.selectedSchool.set(null);
  }

  onOptionsHide(): void {
    this.selectedSchool.set(null);
  }

  async onCreateSubmit(): Promise<void> {
    if (this.isCreating()) return;
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const value = this.createForm.getRawValue();
    const adminEmail = value.adminEmail.trim().toLowerCase();
    const command: CreateSchoolCommand = {
      name: value.name.trim(),
      ...(adminEmail && { email: adminEmail }),
    };

    this.isCreating.set(true);
    try {
      const createdSchool = await this.facade.createSchool(command);
      this.showToast(
        'success',
        'Établissement créé !',
        adminEmail
          ? `"${createdSchool.name}" a été enregistré. Une invitation a été envoyée à ${adminEmail}.`
          : `"${createdSchool.name}" a été enregistré.`,
      );
      this.closeCreateDialog();
      await this.facade.loadSchools();
    } catch (error: any) {
      console.error("Erreur lors de la création de l'école:", error);
      let detail = "Erreur lors de la création de l'école.";
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

  viewSchoolDetails(schoolId: string): void {
    this.closeOptions();
    void this.router.navigate(['/s/schools', schoolId]);
  }

  editSchool(schoolId: string): void {
    this.closeOptions();
    void this.router.navigate(['/s/schools', schoolId, 'edit']);
  }

  replaceAdmin(schoolId: string): void {
    this.closeOptions();
    void this.router.navigate(['/s/schools', schoolId, 'replace-admin']);
  }

  async toggleStatus(school: SchoolSummary): Promise<void> {
    this.closeOptions();
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

  protected statusLabel(status: SchoolStatus | null): string {
    if (!status) return '—';
    switch (status) {
      case SchoolStatus.BLOCKED:
        return 'Bloquée';
      case SchoolStatus.ACTIVE:
        return 'Active';
      case SchoolStatus.SUSPENDED:
        return 'Suspendue';
      case SchoolStatus.INACTIVE:
        return 'Inactive';
    }
  }

  protected statusSeverity(
    status: SchoolStatus | null,
  ): 'success' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case SchoolStatus.ACTIVE:
        return 'success';
      case SchoolStatus.BLOCKED:
        return 'danger';
      case SchoolStatus.SUSPENDED:
        return 'warn';
      default:
        return 'secondary';
    }
  }

  private showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, life: 3500 });
  }
}
