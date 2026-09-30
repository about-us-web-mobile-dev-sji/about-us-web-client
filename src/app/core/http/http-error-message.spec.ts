import { getHttpErrorMessage } from './error-message/http-error-message';

describe('getHttpErrorMessage', () => {
  const network = 'Impossible de joindre le serveur. Vérifiez votre connexion.';
  const server = 'Une erreur interne est survenue. Réessayez plus tard.';

  const cases: [string, { status: number; error: unknown }, string][] = [
    ['réseau', { status: 0, error: null }, network],
    ['500 sans corps', { status: 500, error: null }, server],
    [
      '500 ne montre jamais le message brut',
      { status: 500, error: { code: 'X', message: 'stack trace secrète' } },
      server,
    ],
    ['503', { status: 503, error: { message: 'boom' } }, server],
    [
      '400 avec details.messages',
      { status: 400, error: { code: 'V', message: 'Validation', details: { messages: ['a', 'b'] } } },
      'a\nb',
    ],
    [
      'details.messages prioritaire sur message',
      { status: 422, error: { message: 'Autre', details: { messages: ['seul'] } } },
      'seul',
    ],
    ['409 avec message string', { status: 409, error: { message: 'Code déjà utilisé' } }, 'Code déjà utilisé'],
    ['details.messages vide -> message', { status: 400, error: { message: 'M', details: { messages: [] } } }, 'M'],
    ['message non string -> repli', { status: 404, error: { message: 42 } }, 'Ressource introuvable.'],
    ['400 repli', { status: 400, error: null }, 'Données invalides.'],
    ['401 repli', { status: 401, error: '' }, 'Session expirée ou non authentifié.'],
    ['403 repli', { status: 403, error: {} }, 'Permissions insuffisantes.'],
    ['404 repli', { status: 404, error: null }, 'Ressource introuvable.'],
    ['409 repli', { status: 409, error: null }, 'Conflit avec l’état actuel de la ressource.'],
    ['422 repli', { status: 422, error: null }, 'Données invalides.'],
    ['4xx inconnu', { status: 418, error: null }, 'Une erreur est survenue.'],
  ];

  it.each(cases)('%s', (_name, input, expected) => {
    expect(getHttpErrorMessage(input)).toBe(expected);
  });
});
