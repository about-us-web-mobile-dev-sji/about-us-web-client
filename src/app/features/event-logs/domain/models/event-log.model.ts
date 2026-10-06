export interface EventLog {
  id: string;
  name: string;
  entityType: string;
  entityId: string;
  actorId: string | null;
  payload: Record<string, unknown>;
  occurredAt: string;
}