import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login-form',
  styleUrl: './login-form.css',
  templateUrl: './login-form.html',
})
export class LoginForm {
  private fb = inject(FormBuilder);

  @Output() submitCredentials = new EventEmitter<{ email: string; password: string }>();

  credentialForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get emailControl() {
    return this.credentialForm.get('email');
  }

  get passwordControl() {
    return this.credentialForm.get('password');
  }

  updateEmail(){
    // helper for demo
    this.credentialForm.get('email')?.setValue('off');
  }

  onSubmit() {
    if (this.credentialForm.invalid) {
      return;
    }

    const cmd = this.credentialForm.getRawValue() as { email: string; password: string };
    this.submitCredentials.emit(cmd);
  }
}
