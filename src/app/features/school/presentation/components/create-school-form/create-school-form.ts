import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { Spinner } from '@primeicons/angular/spinner';
import type { CreateSchoolCommand } from '../../../domain/models/school.model';

@Component({
  imports: [
    ReactiveFormsModule,
    ButtonDirective,
    InputTextModule,
    MessageModule,
    Spinner,
  ],
  selector: 'app-create-school-form',
  styleUrl: './create-school-form.css',
  templateUrl: './create-school-form.html',
})
export class CreateSchoolForm {
  @Input() isLoading = false;

  private readonly fb = inject(FormBuilder);

  @Output() submitSchool = new EventEmitter<CreateSchoolCommand>();

  readonly schoolForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    code: ['', [Validators.required, Validators.pattern(/^[A-Z0-9_-]+$/)]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    country: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^(\+|00)?[0-9\s.-]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    principalAdminId: [''],
  });

  get nameControl() {
    return this.schoolForm.controls.name;
  }

  get codeControl() {
    return this.schoolForm.controls.code;
  }

  get addressControl() {
    return this.schoolForm.controls.address;
  }

  get cityControl() {
    return this.schoolForm.controls.city;
  }

  get postalCodeControl() {
    return this.schoolForm.controls.postalCode;
  }

  get countryControl() {
    return this.schoolForm.controls.country;
  }

  get phoneControl() {
    return this.schoolForm.controls.phone;
  }

  get emailControl() {
    return this.schoolForm.controls.email;
  }

  get principalAdminIdControl() {
    return this.schoolForm.controls.principalAdminId;
  }

  onSubmit(): void {
    if (this.isLoading) return;
    if (this.schoolForm.invalid) {
      this.schoolForm.markAllAsTouched();
      return;
    }

    const formValue = this.schoolForm.getRawValue();
    const command: CreateSchoolCommand = {
      ...formValue,
      principalAdminId: formValue.principalAdminId || undefined,
    };

    this.submitSchool.emit(command);
  }

  onReset(): void {
    this.schoolForm.reset();
  }
}
