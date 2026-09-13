import { Component, OnInit, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventLog } from '../../../domain/models/event-log.model';
import { EventLogsFacade } from '../../../application/event-logs.facade';

@Component({
  selector: 'app-event-log-detail-page',
  standalone: true,
  imports: [JsonPipe, RouterLink],
  templateUrl: './event-log-detail-page.html',
  styleUrl: './event-log-detail-page.css',
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

  protected formatDate(value: string): string {
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(new Date(value));
  }
}
