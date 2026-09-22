import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  OnChanges,
  type SimpleChanges,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { Spinner } from '@primeicons/angular/spinner';
import type { CreateSchoolCommand, SchoolSummary } from '../../../domain/models/school.model';

interface SchoolFormValue {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  email: string;
  website: string;
}

const OPTIONAL_FIELDS: { key: keyof CreateSchoolCommand; formKey: keyof SchoolFormValue }[] = [
  { key: 'address', formKey: 'address' },
  { key: 'city', formKey: 'city' },
  { key: 'postalCode', formKey: 'postalCode' },
  { key: 'country', formKey: 'country' },
  { key: 'phoneNumber', formKey: 'phoneNumber' },
  { key: 'email', formKey: 'email' },
  { key: 'website', formKey: 'website' },
];

@Component({
  imports: [ReactiveFormsModule, ButtonDirective, InputTextModule, MessageModule, Spinner],
  selector: 'app-create-school-form',
  styleUrl: './create-school-form.css',
  templateUrl: './create-school-form.html',
})
export class CreateSchoolForm implements OnChanges {
  @Input() isLoading = false;
  /** École à modifier : si renseigné, le formulaire est pré-rempli avec toutes ses informations. */
  @Input() school?: SchoolSummary | null;
  @Input() submitLabel = "Enregistrer l'école";
  @Input() showReset = true;

  private readonly fb = inject(FormBuilder);

  @Output() submitSchool = new EventEmitter<CreateSchoolCommand>();

  readonly schoolForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    address: [''],
    city: [''],
    postalCode: [''],
    country: [''],
    phoneNumber: ['', [Validators.pattern(/^(\+|00)?[0-9\s.-]+$/)]],
    email: ['', [Validators.email]],
    website: [''],
  });

  get nameControl() {
    return this.schoolForm.controls.name;
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

  get phoneNumberControl() {
    return this.schoolForm.controls.phoneNumber;
  }

  get emailControl() {
    return this.schoolForm.controls.email;
  }

  get websiteControl() {
    return this.schoolForm.controls.website;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['school']) {
      const school = this.school;
      this.schoolForm.patchValue({
        name: school?.name ?? '',
        address: school?.address ?? '',
        city: school?.city ?? '',
        postalCode: school?.postalCode ?? '',
        country: school?.country ?? '',
        phoneNumber: school?.phoneNumber ?? '',
        email: school?.email ?? '',
        website: school?.website ?? '',
      });
    }
  }

  onSubmit(): void {
    if (this.isLoading) return;
    if (this.schoolForm.invalid) {
      this.schoolForm.markAllAsTouched();
      return;
    }

    const formValue = this.schoolForm.getRawValue() as SchoolFormValue;
    const command: CreateSchoolCommand = { name: formValue.name.trim() };

    for (const field of OPTIONAL_FIELDS) {
      const value = formValue[field.formKey].trim();
      if (value) {
        command[field.key] = value;
      }
    }

    this.submitSchool.emit(command);
  }

  onReset(): void {
    this.schoolForm.reset();
  }
}