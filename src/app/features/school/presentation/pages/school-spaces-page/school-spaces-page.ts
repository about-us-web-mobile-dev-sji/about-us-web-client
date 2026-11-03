import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SchoolFacade } from '../../../application/school.facade';
import { SchoolSpacesChart } from '../../../../spaces/presentation/components/school-spaces-chart/school-spaces-chart';

@Component({
  selector: 'app-school-spaces-page',
  imports: [BreadcrumbModule, SchoolSpacesChart],
  template: `
    <div class="au-page">
      <p-breadcrumb [home]="crumbHome" [model]="crumbs()" styleClass="bg-transparent! p-0!" />
      @if (schoolId()) {
        <app-school-spaces-chart [schoolId]="schoolId()" [schoolName]="schoolName()" />
      }
    </div>
  `,
})
export class SchoolSpacesPage {
  private readonly facade = inject(SchoolFacade);
  readonly schoolId = toSignal(inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('schoolId') ?? '')), {
    initialValue: '',
  });
  readonly crumbHome: MenuItem = { icon: 'pi pi-home', routerLink: '/s/home', ariaLabel: 'Accueil' };
  readonly crumbs = computed<MenuItem[]>(() => [
    { label: 'Écoles', routerLink: '/s/schools' },
    { label: this.schoolName(), routerLink: ['/s/schools', this.schoolId()] },
    { label: 'Espaces' },
  ]);
  readonly schoolName = () => this.facade.schools().find((s) => s.id === this.schoolId())?.name ?? 'École';
}
