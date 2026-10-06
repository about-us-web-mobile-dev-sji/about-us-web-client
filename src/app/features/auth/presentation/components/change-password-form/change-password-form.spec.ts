import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ChangePasswordForm } from './change-password-form';

describe('ChangePasswordForm', () => {
  function create() {
    TestBed.configureTestingModule({ imports: [ChangePasswordForm] });
    return TestBed.createComponent(ChangePasswordForm).componentInstance;
  }

  for (const [password, valid] of [
    ['a'.repeat(11), false],
    ['a'.repeat(12), true],
    ['a'.repeat(72), true],
    ['a'.repeat(73), false],
    ['é'.repeat(36), true],
    ['é'.repeat(37), false],
    ['😀'.repeat(11), false],
    ['😀'.repeat(12), true],
    ['😀'.repeat(18), true],
    ['😀'.repeat(19), false],
    [' '.repeat(12), false],
  ] as const) {
    it(`validates ${Array.from(password).length} code points / ${new TextEncoder().encode(password).length} bytes`, () => {
      const component = create();
      component.form.setValue({
        currentPassword: 'old-password',
        newPassword: password,
        confirmation: password,
      });
      expect(component.form.valid).toBe(valid);
    });
  }

  it('requires a different password and matching confirmation', () => {
    const component = create();
    component.form.setValue({
      currentPassword: 'same-password',
      newPassword: 'same-password',
      confirmation: 'different',
    });
    expect(component.form.hasError('unchanged')).toBe(true);
    expect(component.form.hasError('mismatch')).toBe(true);
    const emit = vi.spyOn(component.submitPassword, 'emit');
    component.onSubmit();
    expect(emit).not.toHaveBeenCalled();
  });

  it('emits only the two API fields and prevents submission while loading', () => {
    const component = create();
    const emit = vi.spyOn(component.submitPassword, 'emit');
    component.form.setValue({
      currentPassword: 'old-password',
      newPassword: 'new-password-123',
      confirmation: 'new-password-123',
    });
    component.onSubmit();
    expect(emit).toHaveBeenCalledExactlyOnceWith({
      currentPassword: 'old-password',
      newPassword: 'new-password-123',
    });
    component.isLoading = true;
    component.onSubmit();
    expect(emit).toHaveBeenCalledTimes(1);
    component.reset();
    expect(component.form.getRawValue()).toEqual({
      currentPassword: '',
      newPassword: '',
      confirmation: '',
    });
  });
});
