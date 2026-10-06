import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventLogsFacade } from '../../../application/event-logs.facade';

@Component({
  selector: 'app-event-logs-page',
  standalone: true,
  templateUrl: './event-logs-page.html',
  styleUrl: './event-logs-page.css',
  imports: [RouterLink],
})
export class EventLogsPage implements OnInit {
  protected readonly eventLogsFacade = inject(EventLogsFacade);
  private readonly route = inject(ActivatedRoute);
  protected readonly entityType = this.route.snapshot.paramMap.get('entityType') ?? '';
  protected readonly entityId = this.route.snapshot.paramMap.get('entityId') ?? '';

  ngOnInit(): void {
    if (this.entityType && this.entityId) {
      void this.eventLogsFacade.loadAggregate(this.entityType, this.entityId);
    } else {
      void this.eventLogsFacade.load();
    }
  }

  protected formatDate(value: string): string {
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(value));
  }

  protected formatPayload(payload: Record<string, unknown>): string {
    return JSON.stringify(payload);
  }

  protected applyFilters(search: string, entityType: string): void {
    void this.eventLogsFacade.applyFilters({
      search: search.trim() || undefined,
      entityType: entityType || undefined,
    });
  }
}