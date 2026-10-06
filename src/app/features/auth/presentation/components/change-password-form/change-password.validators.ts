import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const newPasswordPolicy: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const value: string = control.value ?? '';
  if (!value.trim()) return { required: true };
  if (Array.from(value).length < 12) return { tooShort: true };
  if (new TextEncoder().encode(value).length > 72) return { tooManyBytes: true };
  return null;
};

export const matchingPasswords: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const { currentPassword, newPassword, confirmation } = control.value;
  const errors: ValidationErrors = {};
  if (newPassword && newPassword === currentPassword) errors['unchanged'] = true;
  if (confirmation && confirmation !== newPassword) errors['mismatch'] = true;
  return Object.keys(errors).length ? errors : null;
};
