import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { SchoolFacade } from '../../../application/school.facade';
import type { SchoolSummary } from '../../../domain/models/school.model';

@Component({
  imports: [ToastModule],
  selector: 'app-edit-school-page',
  styleUrl: './edit-school-page.css',
  templateUrl: './edit-school-page.html',
})
export class EditSchoolPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly facade = inject(SchoolFacade);

  readonly isLoading = signal(true);
  school?: SchoolSummary;

  ngOnInit(): void {
    void this.loadSchool();
  }

  private async loadSchool(): Promise<void> {
    try {
      await this.facade.loadSchools();
      const id = this.route.snapshot.paramMap.get('schoolId') ?? '';
      this.school = this.facade.schools().find((s) => s.id === id);
    } finally {
      this.isLoading.set(false);
    }
  }

  openDetail(): void {
    if (!this.school) return;
    void this.router.navigate(['/s/schools', this.school.id]);
  }

  goBackToList(): void {
    void this.router.navigate(['/s/schools']);
  }
}
