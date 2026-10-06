import type { LoginCommand } from '../../../domain/ports/auth.repository';
import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputPasswordModule } from 'primeng/inputpassword';
import { MessageModule } from 'primeng/message';
import { Spinner } from '@primeicons/angular/spinner';
import { Eye } from '@primeicons/angular/eye';
import { EyeSlash } from '@primeicons/angular/eye-slash';

@Component({
  imports: [
    ReactiveFormsModule,
    ButtonDirective,
    InputTextModule,
    InputPasswordModule,
    MessageModule,
    Spinner,
    Eye,
    EyeSlash,
  ],
  selector: 'app-login-form',
  styleUrl: './login-form.css',
  templateUrl: './login-form.html',
})
export class LoginForm {
  @Input() isLoading = false;

  mask: boolean = true;

  private readonly fb = inject(FormBuilder);

  @Output() submitCredentials = new EventEmitter<LoginCommand>();

  readonly credentialForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get emailControl() {
    return this.credentialForm.controls.email;
  }

  get passwordControl() {
    return this.credentialForm.controls.password;
  }

  onSubmit(): void {
    if (this.isLoading) return;
    if (this.credentialForm.invalid) {
      this.credentialForm.markAllAsTouched();
      return;
    }

    this.submitCredentials.emit(this.credentialForm.getRawValue());
  }
}
