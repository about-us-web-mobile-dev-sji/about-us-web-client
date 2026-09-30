import { HttpContextToken } from '@angular/common/http';

/** Quand true, l'intercepteur d'erreurs relance l'erreur sans afficher de toast. */
export const SKIP_ERROR_TOAST = new HttpContextToken<boolean>(() => false);
