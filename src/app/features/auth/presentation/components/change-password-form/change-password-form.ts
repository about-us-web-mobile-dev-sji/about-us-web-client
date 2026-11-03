import { Button } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPasswordModule } from 'primeng/inputpassword';
import type { ChangePasswordCommand } from '../../../domain/models/password-change.model';
import { matchingPasswords, newPasswordPolicy } from './change-password.validators';

@Component({
  selector: 'app-change-password-form',
  imports: [Button, MessageModule, ReactiveFormsModule, InputPasswordModule],
  templateUrl: './change-password-form.html',
})
export class ChangePasswordForm {
  @Input() isLoading = false;
  @Output() readonly submitPassword = new EventEmitter<ChangePasswordCommand>();
  readonly form = inject(FormBuilder).nonNullable.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, newPasswordPolicy]],
      confirmation: ['', Validators.required],
    },
    { validators: matchingPasswords },
  );
  readonly fields = [
    { name: 'currentPassword', label: 'Mot de passe actuel', autocomplete: 'current-password' },
    { name: 'newPassword', label: 'Nouveau mot de passe', autocomplete: 'new-password' },
    { name: 'confirmation', label: 'Confirmation', autocomplete: 'new-password' },
  ] as const;

  errorFor(name: keyof typeof this.form.controls): string | null {
    const control = this.form.controls[name];
    if (!control.touched) return null;
    if (control.hasError('required')) return 'Ce champ est obligatoire.';
    if (control.hasError('tooShort')) return 'Utilisez au moins 12 caractères.';
    if (control.hasError('tooManyBytes')) return 'Le mot de passe dépasse 72 octets UTF-8.';
    if (name === 'newPassword' && this.form.hasError('unchanged'))
      return 'Choisissez un mot de passe différent de l’ancien.';
    if (name === 'confirmation' && this.form.hasError('mismatch'))
      return 'La confirmation ne correspond pas au nouveau mot de passe.';
    return null;
  }

  onSubmit(): void {
    if (this.isLoading) return;
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const { currentPassword, newPassword } = this.form.getRawValue();
    this.submitPassword.emit({ currentPassword, newPassword });
  }

  reset(): void {
    this.form.reset();
  }
}
