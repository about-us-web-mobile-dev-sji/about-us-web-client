import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  imports: [
    ReactiveFormsModule,
    ButtonDirective,
    InputTextModule,
    MessageModule,
  ],
  selector: 'app-replace-admin-form',
  styleUrl: './replace-admin-form.css',
  templateUrl: './replace-admin-form.html',
})
export class ReplaceAdminForm {
  @Input() isLoading = false;
  @Input() schoolId = '';

  private readonly fb = inject(FormBuilder);

  @Output() submitReplace = new EventEmitter<string>();

  readonly replaceForm = this.fb.nonNullable.group({
    newAdminUserId: ['', [Validators.required, Validators.minLength(1)]],
  });

  get newAdminUserIdControl() {
    return this.replaceForm.controls.newAdminUserId;
  }

  onSubmit(): void {
    if (this.isLoading) return;
    if (this.replaceForm.invalid) {
      this.replaceForm.markAllAsTouched();
      return;
    }

    const formValue = this.replaceForm.getRawValue();
    this.submitReplace.emit(formValue.newAdminUserId);
  }
}