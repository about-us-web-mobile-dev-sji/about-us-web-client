import type { LoginCommand } from '../../../domain/ports/auth.repository';
import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login-form',
  styleUrl: './login-form.css',
  templateUrl: './login-form.html',
})
export class LoginForm {
  @Input() isLoading = false;

  private readonly fb = inject(FormBuilder);

  @Output() submitCredentials = new EventEmitter<LoginCommand>();

  readonly credentialForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get emailControl() {
    return this.credentialForm.get('email');
  }

  get passwordControl() {
    return this.credentialForm.get('password');
  }

  onSubmit(): void {
    if (this.isLoading || this.credentialForm.invalid) {
      return;
    }

    this.submitCredentials.emit(this.credentialForm.getRawValue());
  }
}
