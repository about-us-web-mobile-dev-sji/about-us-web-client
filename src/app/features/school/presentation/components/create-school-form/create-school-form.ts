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

@Component({
  imports: [ReactiveFormsModule, ButtonDirective, InputTextModule, MessageModule, Spinner],
  selector: 'app-create-school-form',
  templateUrl: './create-school-form.html',
})
export class CreateSchoolForm implements OnChanges {
  @Input() isLoading = false;
  @Input() school?: SchoolSummary | null;
  @Input() submitLabel = "Enregistrer l'école";
  @Input() showReset = true;

  private readonly fb = inject(FormBuilder);

  @Output() submitSchool = new EventEmitter<CreateSchoolCommand>();

  readonly schoolForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  get nameControl() {
    return this.schoolForm.controls.name;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['school']) {
      this.schoolForm.patchValue({
        name: this.school?.name ?? '',
      });
    }
  }

  onSubmit(): void {
    console.log('onSubmit called with isLoading:', this.isLoading, 'and schoolForm:', this.schoolForm.value);
    if (this.isLoading) return;
    console.log('Form validity:', this.schoolForm.valid, 'Form values:', this.schoolForm.getRawValue());
    if (this.schoolForm.invalid) {
      this.schoolForm.markAllAsTouched();
      console.log('Form is invalid. Marked all controls as touched.');
      return;
    }

    const name = this.schoolForm.getRawValue().name.trim();
    this.submitSchool.emit({ name });
  }

  onReset(): void {
    this.schoolForm.reset();
  }
}