import { Injectable, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EventLog } from '../domain/models/event-log.model';
import { HttpEventLogRepository } from '../infrastructure/repositories/http-event-log.repository';
import type { EventLogListQuery } from '../infrastructure/repositories/http-event-log.repository';

@Injectable({ providedIn: 'root' })
export class EventLogsFacade {
  private readonly repository = inject(HttpEventLogRepository);

  readonly logs = signal<EventLog[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly total = signal(0);
  readonly page = signal(1);
  readonly limit = signal(10);
  readonly totalPages = signal(1);
  readonly filters = signal<Pick<EventLogListQuery, 'entityType' | 'search'>>({});

  async load(query: EventLogListQuery = { page: this.page(), limit: this.limit(), ...this.filters() }): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const result = await this.repository.list(query);
      this.logs.set(result.items);
      this.total.set(result.total);
      this.page.set(result.page);
      this.limit.set(result.limit);
      this.totalPages.set(result.totalPages);
      this.filters.set({ entityType: query.entityType, search: query.search });
    } catch (error: unknown) {
      this.error.set(this.getRequestError(error));
    } finally {
      this.isLoading.set(false);
    }
  }

  async loadDetail(id: string): Promise<EventLog | null> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      return await this.repository.findById(id);
    } catch (error: unknown) {
      this.error.set(this.getRequestError(error));
      return null;
    } finally {
      this.isLoading.set(false);
    }
  }

  async loadAggregate(entityType: string, entityId: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      this.logs.set(await this.repository.findByAggregate(entityType, entityId));
    } catch (error: unknown) {
      this.error.set(this.getRequestError(error));
    } finally {
      this.isLoading.set(false);
    }
  }

  async applyFilters(filters: Pick<EventLogListQuery, 'entityType' | 'search'>): Promise<void> {
    await this.load({ page: 1, limit: this.limit(), ...filters });
  }

  async changePage(page: number): Promise<void> {
    if (page < 1 || page > this.totalPages()) return;
    await this.load({ page, limit: this.limit(), ...this.filters() });
  }

  private getRequestError(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      return error.status === 0
        ? 'Impossible de joindre l’API des journaux.'
        : `Impossible de charger les journaux : HTTP ${error.status}.`;
    }
    return 'Impossible de charger les journaux.';
  }
}