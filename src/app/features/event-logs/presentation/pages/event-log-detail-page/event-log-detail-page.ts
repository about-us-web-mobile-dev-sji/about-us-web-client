import { Component, OnInit, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { EventLog } from '../../../domain/models/event-log.model';
import { UserChip } from '../../../../../shared/components/user-chip/user-chip';
import { EventLogsFacade } from '../../../application/event-logs.facade';

@Component({
  selector: 'app-event-log-detail-page',
  standalone: true,
  imports: [UserChip, JsonPipe, RouterLink, ButtonDirective, ButtonIcon, ButtonLabel, CardModule, MessageModule],
  templateUrl: './event-log-detail-page.html',
})
export class EventLogDetailPage implements OnInit {
  protected readonly eventLogsFacade = inject(EventLogsFacade);
  private readonly route = inject(ActivatedRoute);
  protected log: EventLog | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      void this.load(id);
    }
  }

  protected async load(id: string): Promise<void> {
    this.log = await this.eventLogsFacade.loadDetail(id);
  }

  protected rows(log: EventLog): { label: string; value: string }[] {
    return [
      { label: $localize`:@@event-log-id:Identifiant`, value: log.id },
      { label: $localize`:@@event-log-entity-type:Type d’entité`, value: log.entityType },
      { label: $localize`:@@event-log-entity-id:Identifiant de l’entité`, value: log.entityId },
      { label: $localize`:@@event-log-date:Date`, value: this.formatDate(log.occurredAt) },
    ];
  }

  protected formatDate(value: string): string {
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(new Date(value));
  }
}
