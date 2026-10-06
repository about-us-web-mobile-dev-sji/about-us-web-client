import { CLIENT_ERROR_CODES } from '../errors/app-error';

/** Translated message for each known error code (backend and client codes). */
const MESSAGES: Readonly<Record<string, string>> = {
  // Auth
  INVALID_CREDENTIALS: $localize`:@@error.INVALID_CREDENTIALS:E-mail ou mot de passe incorrect.`,
  ACCOUNT_UNAVAILABLE: $localize`:@@error.ACCOUNT_UNAVAILABLE:Ce compte est indisponible. Contacte un administrateur.`,
  INVALID_SESSION: $localize`:@@error.INVALID_SESSION:Ta session n’est plus valide. Reconnecte-toi.`,
  ACCESS_TOKEN_REQUIRED: $localize`:@@error.ACCESS_TOKEN_REQUIRED:Connecte-toi pour continuer.`,
  ACCESS_TOKEN_INVALID: $localize`:@@error.ACCESS_TOKEN_INVALID:Ta session a expiré. Reconnecte-toi.`,
  REFRESH_TOKEN_REQUIRED: $localize`:@@error.REFRESH_TOKEN_REQUIRED:Connecte-toi pour continuer.`,
  REFRESH_TOKEN_INVALID: $localize`:@@error.REFRESH_TOKEN_INVALID:Ta session a expiré. Reconnecte-toi.`,
  UNTRUSTED_ORIGIN: $localize`:@@error.UNTRUSTED_ORIGIN:Requête refusée : origine non autorisée.`,
  INSUFFICIENT_ROLE: $localize`:@@error.INSUFFICIENT_ROLE:Tu n’as pas les droits nécessaires pour cette action.`,
  INVALID_AUTH_REQUEST: $localize`:@@error.INVALID_AUTH_REQUEST:Certains champs sont manquants ou invalides.`,
  INVALID_GOOGLE_IDENTITY: $localize`:@@error.INVALID_GOOGLE_IDENTITY:Connexion Google impossible avec ce compte.`,
  INVALID_PASSWORD: $localize`:@@error.INVALID_PASSWORD:Le nouveau mot de passe ne respecte pas les règles ou reprend le mot de passe actuel.`,
  PASSWORD_CHANGE_CONFLICT: $localize`:@@error.PASSWORD_CHANGE_CONFLICT:Le mot de passe a été modifié entre-temps. Reconnecte-toi avant de réessayer.`,
  PASSWORD_CHANGE_FORBIDDEN: $localize`:@@error.PASSWORD_CHANGE_FORBIDDEN:Tu ne peux pas modifier le mot de passe de ce compte.`,
  SIGNUP_NOT_ALLOWED: $localize`:@@error.SIGNUP_NOT_ALLOWED:Aucune invitation en attente pour ce compte Google. Demande une invitation à ton école.`,
  GOOGLE_LOGIN_FAILED: $localize`:@@error.GOOGLE_LOGIN_FAILED:La connexion Google a échoué ou a été annulée. Réessaie.`,
  SESSION_NOT_FOUND: $localize`:@@error.SESSION_NOT_FOUND:Cette session n’existe plus.`,
  // School invitations
  SCHOOL_INVITATION_INVALID: $localize`:@@error.SCHOOL_INVITATION_INVALID:Cette invitation est invalide, expirée ou déjà utilisée.`,
  SCHOOL_INVITATION_MISMATCH: $localize`:@@error.SCHOOL_INVITATION_MISMATCH:Cette invitation a été envoyée à une autre adresse e-mail que celle de ton compte.`,
  SCHOOL_MEMBERSHIP_ACTION_FORBIDDEN: $localize`:@@error.SCHOOL_MEMBERSHIP_ACTION_FORBIDDEN:Ton accès à cette école a été suspendu ou révoqué.`,
  SCHOOL_ADMINISTRATOR_ALREADY_ASSIGNED: $localize`:@@error.SCHOOL_ADMINISTRATOR_ALREADY_ASSIGNED:Cette école a déjà un administrateur.`,
  SCHOOL_ROLE_NOT_FOUND: $localize`:@@error.SCHOOL_ROLE_NOT_FOUND:Ce rôle n’existe plus dans l’école.`,
  SCHOOL_NOT_FOUND: $localize`:@@error.SCHOOL_NOT_FOUND:École introuvable.`,
  INVALID_SCHOOL_MEMBERSHIP: $localize`:@@error.INVALID_SCHOOL_MEMBERSHIP:Cette personne est déjà membre de l’école (ou suspendue) : modifie son rôle plutôt que de l’inviter.`,
  INVALID_SCHOOL: $localize`:@@error.INVALID_SCHOOL:Cette école n’accepte pas d’invitation pour le moment.`,
  // Generic HTTP
  BAD_REQUEST: $localize`:@@error.BAD_REQUEST:La requête est invalide.`,
  UNAUTHORIZED: $localize`:@@error.UNAUTHORIZED:Connecte-toi pour continuer.`,
  FORBIDDEN: $localize`:@@error.FORBIDDEN:Action non autorisée.`,
  NOT_FOUND: $localize`:@@error.NOT_FOUND:Élément introuvable.`,
  CONFLICT: $localize`:@@error.CONFLICT:Conflit avec l’état actuel. Recharge la page.`,
  TOO_MANY_REQUESTS: $localize`:@@error.TOO_MANY_REQUESTS:Trop de tentatives. Réessaie dans quelques instants.`,
  INTERNAL_SERVER_ERROR: $localize`:@@error.INTERNAL_SERVER_ERROR:Le serveur a rencontré une erreur. Réessaie plus tard.`,
  // Client
  [CLIENT_ERROR_CODES.network]: $localize`:@@error.NETWORK_ERROR:Serveur injoignable. Vérifie ta connexion.`,
  [CLIENT_ERROR_CODES.sessionExpired]: $localize`:@@error.SESSION_EXPIRED:Ta session a expiré. Reconnecte-toi.`,
  [CLIENT_ERROR_CODES.sessionRestoreFailed]: $localize`:@@error.SESSION_RESTORE_FAILED:Impossible de restaurer la session. Reconnecte-toi.`,
  [CLIENT_ERROR_CODES.unknown]: $localize`:@@error.UNKNOWN_ERROR:Une erreur inattendue est survenue. Réessaie.`,
};

/**
 * @param overrides wording specific to a screen for some codes
 *   (e.g. INVALID_CREDENTIALS on the password change form).
 */
export function errorMessage(code: string, overrides: Readonly<Record<string, string>> = {}): string {
  return overrides[code] ?? MESSAGES[code] ?? MESSAGES[CLIENT_ERROR_CODES.unknown];
}
