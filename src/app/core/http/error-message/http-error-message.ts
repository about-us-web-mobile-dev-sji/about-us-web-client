import type { HttpErrorResponse } from '@angular/common/http';

const NETWORK_MESSAGE = 'Impossible de joindre le serveur. Vérifiez votre connexion.';
const SERVER_MESSAGE = 'Une erreur interne est survenue. Réessayez plus tard.';
const DEFAULT_MESSAGE = 'Une erreur est survenue.';

const STATUS_MESSAGES: Record<number, string> = {
  400: 'Données invalides.',
  401: 'Session expirée ou non authentifié.',
  403: 'Permissions insuffisantes.',
  404: 'Ressource introuvable.',
  409: 'Conflit avec l’état actuel de la ressource.',
  422: 'Données invalides.',
};

export function getHttpErrorMessage(error: Pick<HttpErrorResponse, 'status' | 'error'>): string {
  if (error.status === 0) return NETWORK_MESSAGE;
  if (error.status >= 500) return SERVER_MESSAGE;

  const body = error.error as
    | { message?: unknown; details?: { messages?: unknown } | null }
    | null
    | undefined;

  const messages = body?.details?.messages;
  if (Array.isArray(messages)) {
    const texts = messages.filter((m): m is string => typeof m === 'string' && m.length > 0);
    if (texts.length > 0) return texts.join('\n');
  }

  if (typeof body?.message === 'string' && body.message.length > 0) return body.message;

  return STATUS_MESSAGES[error.status] ?? DEFAULT_MESSAGE;
}
