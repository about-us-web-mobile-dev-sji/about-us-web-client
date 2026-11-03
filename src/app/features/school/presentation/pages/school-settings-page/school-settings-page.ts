import { NotifyService } from '../../../../../core/notifications/notify.service';
import { Component, ElementRef, OnInit, computed, effect, inject, signal, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, type ValidatorFn } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { SchoolFacade } from '../../../application/school.facade';
import { SchoolMembershipFacade } from '../../../application/school-membership.facade';
import { SchoolMemberRole } from '../../../domain/models/school-membership.model';
import { SchoolStatus, type School, type UpdateSchoolCommand } from '../../../domain/models/school.model';
import { UserChip } from '../../../../../shared/components/user-chip/user-chip';
import { userLabel, type UserSummary } from '../../../../../shared/users/user-summary';
import { ReplaceAdminForm } from '../../components/replace-admin-form/replace-admin-form';

type EditableField = 'name' | 'email' | 'phoneNumber' | 'website' | 'logo';

interface InfoItem {
  key: EditableField;
  label: string;
  value: string | null;
  href?: string;
  inputType: 'text' | 'email' | 'tel' | 'url';
  placeholder: string;
}

/** Règles de saisie par champ (le nom est obligatoire, les autres facultatifs). */
const FIELD_RULES: Readonly<Record<EditableField, { validators: ValidatorFn[]; error: string }>> = {
  name: {
    validators: [Validators.required, Validators.minLength(3), Validators.maxLength(120)],
    error: 'Le nom doit contenir entre 3 et 120 caractères.',
  },
  email: { validators: [Validators.email, Validators.maxLength(320)], error: 'Renseignez une adresse e-mail valide.' },
  phoneNumber: { validators: [Validators.pattern(/^\+?[0-9 ().-]{6,20}$/)], error: 'Renseignez un numéro de téléphone valide.' },
  website: {
    validators: [Validators.pattern(/^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#][^\s]*)?$/i), Validators.maxLength(255)],
    error: 'Renseignez une adresse de site valide (ex. lycee-essos.cm).',
  },
  logo: {
    validators: [Validators.pattern(/^https?:\/\/\S+$/i), Validators.maxLength(500)],
    error: "Renseignez l'URL d'une image (https://…, 500 caractères max).",
  },
};

/** Onglet « Paramètres » d'une école : profil, coordonnées, administration et accès. */
@Component({
  selector: 'app-school-settings-page',
  imports: [
    NgTemplateOutlet,
    BreadcrumbModule,
    CardModule,
    DialogModule,
    SkeletonModule,
    MessageModule,
    ProgressSpinnerModule,
    TagModule,
    ReplaceAdminForm,
    UserChip,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './school-settings-page.html',
})
export class SchoolSettingsPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly notify = inject(NotifyService);
  private readonly schoolFacade = inject(SchoolFacade);
  private readonly membershipFacade = inject(SchoolMembershipFacade);
  private readonly confirmation = inject(ConfirmationService);

  readonly schoolId = this.route.snapshot.paramMap.get('schoolId') ?? '';
  readonly school = signal<School | null>(null);
  readonly isLoading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly isSubmitting = signal(false);
  /** Administrateurs actuels, lus dans la liste des membres (rôle ADMIN). */
  readonly admins = signal<UserSummary[]>([]);
  readonly adminsLoading = signal(true);
  readonly adminsError = signal(false);
  readonly adminIds = computed(() => this.admins().map((admin) => admin.id));
  readonly showReplaceDialog = signal(false);
  readonly isToggling = signal(false);
  /** Le logo n'a pas pu se charger (adresse invalide) : on revient à l'initiale. */
  readonly logoFailed = signal(false);
  readonly isBlocked = computed(() => this.school()?.status === SchoolStatus.BLOCKED);

  // ---------- Édition en place des coordonnées ----------
  /** Champ en cours d'édition (une seule ligne à la fois). */
  readonly editing = signal<EditableField | null>(null);
  readonly draft = new FormControl('', { nonNullable: true });
  readonly isSaving = signal(false);
  private readonly editInput = viewChild<ElementRef<HTMLInputElement>>('editInput');
  private readonly focusEditor = effect(() => {
    if (this.editing()) queueMicrotask(() => this.editInput()?.nativeElement.select());
  });

  fieldError(key: EditableField): string {
    return FIELD_RULES[key].error;
  }

  startEdit(item: InfoItem): void {
    if (this.isSaving()) return;
    this.draft.setValidators(FIELD_RULES[item.key].validators);
    this.draft.reset(item.value ?? '');
    this.editing.set(item.key);
  }

  cancelEdit(): void {
    if (this.isSaving()) return;
    this.editing.set(null);
  }

  async saveEdit(item: InfoItem): Promise<void> {
    const school = this.school();
    if (!school || this.isSaving()) return;
    this.draft.markAsTouched();
    if (this.draft.invalid) return;
    const value = this.draft.value.trim();
    if (value === (item.value ?? '')) {
      this.editing.set(null);
      return;
    }
    const command: UpdateSchoolCommand = { [item.key]: item.key === 'name' ? value : value || null };
    this.isSaving.set(true);
    try {
      this.school.set(await this.schoolFacade.updateSchool(school.id, command));
      if (item.key === 'logo') this.logoFailed.set(false);
      this.editing.set(null);
      this.notify.success(item.key === 'name' || item.key === 'logo' ? 'Profil mis à jour' : 'Coordonnées mises à jour', value ? `${item.label} : ${value}` : `${item.label} supprimé.`);
    } catch (error) {
      this.notify.fromError(error, 'Modification impossible', {
        NOT_FOUND: "Cette école n'existe plus.",
        BAD_REQUEST: FIELD_RULES[item.key].error,
      });
    } finally {
      this.isSaving.set(false);
    }
  }

  readonly crumbHome: MenuItem = { icon: 'pi pi-home', routerLink: '/s/home', ariaLabel: 'Accueil' };
  readonly crumbs = computed<MenuItem[]>(() => [
    { label: 'Écoles', routerLink: '/s/schools' },
    { label: this.school()?.name ?? 'École', routerLink: ['/s/schools', this.schoolId] },
    { label: 'Paramètres' },
  ]);

  async ngOnInit(): Promise<void> {
    void this.loadAdmins();
    try {
      this.school.set(await this.schoolFacade.getSchoolById(this.schoolId));
    } catch {
      this.loadError.set("Impossible de charger les informations de l'école. Vérifiez votre connexion puis rechargez la page.");
    } finally {
      this.isLoading.set(false);
    }
  }

  async loadAdmins(): Promise<void> {
    this.adminsLoading.set(true);
    this.adminsError.set(false);
    try {
      const page = await this.membershipFacade.listMembers(this.schoolId, {
        role: SchoolMemberRole.ADMIN,
        page: 1,
        limit: 10,
      });
      this.admins.set(page.items.filter((member) => member.status === 'ACTIVE').map((member) => member.user));
    } catch {
      this.adminsError.set(true);
    } finally {
      this.adminsLoading.set(false);
    }
  }

  async onReplace(newAdminUserId: string): Promise<void> {
    if (!this.schoolId || this.isSubmitting()) return;
    this.isSubmitting.set(true);
    try {
      const result = await this.membershipFacade.replaceAdministrator(this.schoolId, { newAdminUserId });
      this.showReplaceDialog.set(false);
      this.notify.success('Administrateur remplacé', `${userLabel(result.newAdmin)} administre désormais « ${this.school()?.name ?? 'cette école'} ».`);
      await this.loadAdmins();
    } catch (error: unknown) {
      const status = (error as { status?: number } | null)?.status;
      this.notify.error('Remplacement impossible', status === 404 ? 'Utilisateur ou école introuvable.' : 'Le remplacement de l’administrateur a échoué. Réessayez.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  /** Bloquer coupe l'accès de toute l'école : on demande confirmation. */
  confirmToggleBlock(): void {
    const school = this.school();
    if (!school || this.isToggling()) return;
    const blocking = !this.isBlocked();
    this.confirmation.confirm({
      header: blocking ? 'Bloquer l’école ?' : 'Débloquer l’école ?',
      message: blocking
        ? `Les membres de « ${school.name} » ne pourront plus accéder à la plateforme.`
        : `Les membres de « ${school.name} » retrouveront l’accès à la plateforme.`,
      icon: blocking ? 'pi pi-lock' : 'pi pi-lock-open',
      acceptLabel: blocking ? 'Bloquer' : 'Débloquer',
      rejectLabel: 'Annuler',
      acceptButtonProps: { severity: blocking ? 'danger' : 'success' },
      rejectButtonProps: { severity: 'secondary', text: true },
      accept: () => void this.toggleBlock(),
    });
  }

  private async toggleBlock(): Promise<void> {
    const school = this.school();
    if (!school) return;
    this.isToggling.set(true);
    try {
      if (this.schoolFacade.schools().length === 0) await this.schoolFacade.loadSchools();
      const summary = this.schoolFacade.schools().find((item) => item.id === school.id);
      if (!summary) throw new Error('École introuvable');
      const updated = await this.schoolFacade.toggleBlock(summary);
      this.school.set({ ...school, status: updated.status });
      const blocked = updated.status === SchoolStatus.BLOCKED;
      this.notify[blocked ? 'warn' : 'success'](blocked ? 'École bloquée' : 'École débloquée', `Le statut de « ${school.name} » a été mis à jour.`);
    } catch {
      this.notify.error('Mise à jour impossible', 'La mise à jour du statut a échoué. Réessayez.');
    } finally {
      this.isToggling.set(false);
    }
  }

  /** Profil : ce qui identifie l'école dans la plateforme. */
  profileItems(school: School): InfoItem[] {
    const logo = school.logo?.trim();
    return [
      { key: 'name', label: 'Nom', value: school.name, inputType: 'text', placeholder: "Nom de l'école" },
      {
        key: 'logo',
        label: 'Logo',
        value: logo || null,
        href: logo || undefined,
        inputType: 'url',
        placeholder: 'https://ecole.cm/logo.png',
      },
    ];
  }

  contactItems(school: School): InfoItem[] {
    const website = school.website?.trim();
    return [
      {
        key: 'email',
        label: 'E-mail',
        value: school.email ?? null,
        href: school.email ? `mailto:${school.email}` : undefined,
        inputType: 'email',
        placeholder: 'direction@ecole.cm',
      },
      {
        key: 'phoneNumber',
        label: 'Téléphone',
        value: school.phoneNumber ?? null,
        href: school.phoneNumber ? `tel:${school.phoneNumber}` : undefined,
        inputType: 'tel',
        placeholder: '+237 6 00 00 00 00',
      },
      {
        key: 'website',
        label: 'Site web',
        value: website || null,
        href: website ? (/^https?:\/\//.test(website) ? website : `https://${website}`) : undefined,
        inputType: 'url',
        placeholder: 'ecole.cm',
      },
    ];
  }

  historyItems(school: School): { label: string; value: string }[] {
    // « Créée par » est affiché à part, avec la photo de l'utilisateur.
    const date = (value: Date) =>
      value.getTime() > 0 ? value.toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }) : '—';
    return [
      { label: 'Création', value: date(school.createdAt) },
      { label: 'Dernière mise à jour', value: date(school.updatedAt) },
    ];
  }

  statusLabel(status: SchoolStatus | null): string {
    switch (status) {
      case SchoolStatus.ACTIVE:
        return 'Active';
      case SchoolStatus.BLOCKED:
        return 'Bloquée';
      case SchoolStatus.SUSPENDED:
        return 'Suspendue';
      case SchoolStatus.INACTIVE:
        return 'Inactive';
      default:
        return '—';
    }
  }

  statusSeverity(status: SchoolStatus | null): 'success' | 'danger' | 'warn' | 'secondary' {
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
}
