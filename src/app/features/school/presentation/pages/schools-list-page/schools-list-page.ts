import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SchoolFacade } from '../../../application/school.facade';
import type { School } from '../../../domain/models/school.model';
import { SchoolStatus } from '../../../domain/models/school.model';

@Component({
  imports: [RouterLink, ButtonDirective, TagModule, ProgressSpinnerModule],
  selector: 'app-schools-list-page',
  styleUrl: './schools-list-page.css',
  templateUrl: './schools-list-page.html',
})
export class SchoolsListPage implements OnInit {
  private readonly schoolFacade = inject(SchoolFacade);
  private readonly router = inject(Router);

  schools = signal<School[]>([]);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    await this.loadSchools();
  }

  async loadSchools(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const schools = await this.schoolFacade.getAllSchools();
      this.schools.set(schools);
    } catch (error: any) {
      console.error('Erreur lors de la récupération des écoles:', error);
      this.errorMessage.set('Impossible de charger la liste des écoles.');
    } finally {
      this.isLoading.set(false);
    }
  }

  getSchoolInitial(name: string): string {
    return name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase() || 'E';
  }

  getStatusLabel(status: SchoolStatus): string {
    const labels: Record<SchoolStatus, string> = {
      [SchoolStatus.ACTIVE]: 'Active',
      [SchoolStatus.INACTIVE]: 'Inactive',
      [SchoolStatus.PENDING]: 'En attente',
    };
    return labels[status] || status;
  }

  getStatusSeverity(status: SchoolStatus): 'success' | 'warn' | 'danger' | 'info' {
    const severities: Record<SchoolStatus, 'success' | 'warn' | 'danger' | 'info'> = {
      [SchoolStatus.ACTIVE]: 'success',
      [SchoolStatus.INACTIVE]: 'danger',
      [SchoolStatus.PENDING]: 'warn',
    };
    return severities[status] || 'info';
  }

  navigateToCreate(): void {
    this.router.navigate(['/s/schools/create']);
  }
}
