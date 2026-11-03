import type { UserSummary } from '../../../../shared/users/user-summary';

export interface EventLog {
  id: string;
  name: string;
  /** Phrase lisible décrivant l'événement. */
  message: string;
  entityType: string;
  entityId: string;
  actor: UserSummary | null;
  payload: Record<string, unknown>;
  occurredAt: string;
}