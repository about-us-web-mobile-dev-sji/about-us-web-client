import { Component, effect, inject, input, model, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective, ButtonLabel, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { NotifyService } from '../../../../../core/notifications/notify.service';
import { AppModal } from '../../../../../shared/components/modal/modal';
import { SchoolMembershipFacade } from '../../../application/school-membership.facade';

/** UC-16 : invite une personne dans l'école par e-mail, depuis un modal. */
@Component({
  selector: 'app-invite-member-dialog',
  imports: [ReactiveFormsModule, ButtonModule, ButtonDirective, ButtonLabel, InputTextModule, MessageModule, AppModal],
  templateUrl: './invite-member-dialog.html',
})
export class InviteMemberDialog {
  readonly visible = model(false);
  readonly schoolId = input.required<string>();
  /** Émis après l'envoi, pour recharger une liste d'invitations. */
  readonly invited = output<string>();

  private readonly memberships = inject(SchoolMembershipFacade);
  private readonly notify = inject(NotifyService);

  readonly isSending = signal(false);
  readonly form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
  });

  /** Chaque ouverture repart d'un formulaire vide. */
  private readonly resetOnOpen = effect(() => {
    if (this.visible()) this.form.reset({ email: '' });
  });

  async invite(): Promise<void> {
    if (this.isSending()) return;
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.isSending.set(true);
    try {
      const sent = await this.memberships.inviteMember(this.schoolId(), this.form.getRawValue());
      this.notify.success(
        'Invitation envoyée',
        $localize`:@@invite.sent:Invitation envoyée à ${sent.email}:email:. Elle expire le ${sent.expiresAt.toLocaleDateString()}:date:.`,
      );
      this.invited.emit(sent.email);
      this.visible.set(false);
    } catch (error) {
      this.notify.fromError(error, 'Invitation impossible');
    } finally {
      this.isSending.set(false);
    }
  }
}
