import { NotifyService } from '../../../../../core/notifications/notify.service';
import { Component, OnInit, inject, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { SchoolFacade } from '../../../application/school.facade';
import {
  SchoolStatus,
  type CreateSchoolCommand,
  type SchoolSummary,
} from '../../../domain/models/school.model';

@Component({
  imports: [
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    MessageModule,
    RouterLink,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    TagModule,
  ],
  selector: 'app-schools-list-page',
  templateUrl: './schools-list-page.html',
})
export class SchoolsListPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly notify = inject(NotifyService);
  private readonly router = inject(Router);
  protected readonly facade = inject(SchoolFacade);

  protected readonly SchoolStatus = SchoolStatus;

  readonly showCreateDialog = signal(false);
  readonly isCreating = signal(false);
  /** Logos qui n'ont pas pu se charger : on affiche l'initiale à la place. */
  readonly brokenLogos = signal<ReadonlySet<string>>(new Set());

  markLogoBroken(id: string): void {
    this.brokenLogos.update((ids) => new Set(ids).add(id));
  }

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
      this.showToast('error', 'Création impossible', detail);
    } finally {
      this.isCreating.set(false);
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

  private showToast(severity: 'success' | 'warn' | 'error', summary: string, detail: string): void {
    this.notify[severity](summary, detail);
  }
}
