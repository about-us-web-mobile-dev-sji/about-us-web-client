import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginForm } from './login-form';

describe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginForm],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('shows validation errors without emitting invalid credentials', async () => {
    const emit = vi.spyOn(component.submitCredentials, 'emit');
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();
    expect(emit).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('#email-error')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#password-error')).toBeTruthy();
  });

  it('emits credentials and blocks submission while loading', async () => {
    const emit = vi.spyOn(component.submitCredentials, 'emit');
    const credentials = { email: 'user@example.com', password: 'password' };
    component.credentialForm.setValue(credentials);
    component.onSubmit();
    expect(emit).toHaveBeenCalledExactlyOnceWith(credentials);
    fixture.componentRef.setInput('isLoading', true);
    await fixture.whenStable();
    component.onSubmit();
    expect(emit).toHaveBeenCalledTimes(1);
    const buttons = fixture.nativeElement.querySelectorAll('button[type="submit"]');
    expect(buttons.length).toBe(1);
    expect(buttons[0].disabled).toBe(true);
    expect(buttons[0].textContent).toContain('Connexion');
  });

  it('toggles password visibility without submitting the form', async () => {
    const emit = vi.spyOn(component.submitCredentials, 'emit');
    const button = fixture.nativeElement.querySelector('.password-toggle') as HTMLButtonElement;
    const input = fixture.nativeElement.querySelector('#password') as HTMLInputElement;
    expect(input.type).toBe('password');
    expect(button.type).toBe('button');
    button.click();
    await fixture.whenStable();
    expect(input.type).toBe('text');
    expect(button.getAttribute('aria-label')).toBe('Masquer le mot de passe');
    expect(emit).not.toHaveBeenCalled();
  });
});
