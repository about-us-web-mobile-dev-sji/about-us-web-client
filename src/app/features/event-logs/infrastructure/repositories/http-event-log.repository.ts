import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../../../../core/config/api.config';
import { EventLog } from '../../domain/models/event-log.model';

export interface EventLogListQuery {
  entityType?: string;
  search?: string;
  page: number;
  limit: number;
}

export interface EventLogListResult {
  items: EventLog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({ providedIn: 'root' })
export class HttpEventLogRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  list(query: EventLogListQuery): Promise<EventLogListResult> {
    const params = new URLSearchParams({
      page: String(query.page),
      limit: String(query.limit),
    });
    if (query.entityType) params.set('entityType', query.entityType);
    if (query.search) params.set('search', query.search);

    return firstValueFrom(
      this.http.get<EventLogListResult>(`${this.baseUrl}/event-logs?${params}`),
    );
  }

  findById(id: string): Promise<EventLog> {
    return firstValueFrom(this.http.get<EventLog>(`${this.baseUrl}/event-logs/${id}`));
  }

  findByAggregate(entityType: string, entityId: string): Promise<EventLog[]> {
    return firstValueFrom(
      this.http.get<EventLog[]>(`${this.baseUrl}/event-logs/aggregate/${entityType}/${entityId}`),
    );
  }
}