import { Component, inject, input, signal, type OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SchoolMembershipFacade } from '../../../application/school-membership.facade';
import type { InvitableRole } from '../../../domain/models/school-membership.model';
import { errorCodeOf } from '../../../../../core/errors/app-error';
import { errorMessage } from '../../../../../core/i18n/error-messages';

/** UC-16: invites someone into the school with one of its roles. */
@Component({
  selector: 'app-invite-member-panel',
  imports: [ReactiveFormsModule, ButtonDirective, InputTextModule],
  templateUrl: './invite-member-panel.html',
  styleUrl: './invite-member-panel.css',
})
export class InviteMemberPanel implements OnInit {
  readonly schoolId = input.required<string>();
  private readonly memberships = inject(SchoolMembershipFacade);

  readonly roles = signal<InvitableRole[]>([]);
  readonly isLoadingRoles = signal(true);
  readonly isSending = signal(false);
  readonly success = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  readonly form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
    roleId: ['', Validators.required],
  });

  async ngOnInit(): Promise<void> {
    try {
      const roles = await this.memberships.listInvitableRoles(this.schoolId());
      this.roles.set(roles);
      if (roles.length) this.form.controls.roleId.setValue(roles[0].id);
    } catch (error) {
      this.error.set(errorMessage(errorCodeOf(error)));
    } finally {
      this.isLoadingRoles.set(false);
    }
  }

  async invite(): Promise<void> {
    if (this.isSending()) return;
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.isSending.set(true);
    this.success.set(null);
    this.error.set(null);
    try {
      const sent = await this.memberships.inviteMember(this.schoolId(), this.form.getRawValue());
      this.success.set(
        $localize`:@@invite.sent:Invitation envoyée à ${sent.email}:email:. Elle expire le ${sent.expiresAt.toLocaleDateString()}:date:.`,
      );
      this.form.controls.email.reset('');
    } catch (error) {
      this.error.set(errorMessage(errorCodeOf(error)));
    } finally {
      this.isSending.set(false);
    }
  }
}
