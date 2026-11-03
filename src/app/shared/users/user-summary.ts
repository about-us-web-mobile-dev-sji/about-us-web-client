/** Un utilisateur tel que l'API le renvoie partout où elle le référence. */
export interface UserSummary {
  id: string;
  fullName: string | null;
  /** Null quand l'appelant n'a pas le droit de le voir (vue membre). */
  email: string | null;
  avatarUrl: string | null;
}

/** Nom à afficher : nom complet, sinon e-mail, sinon identifiant raccourci. */
export function userLabel(user: UserSummary | null | undefined): string {
  if (!user) return '—';
  return user.fullName?.trim() || user.email || `${user.id.slice(0, 8)}…`;
}

export function userInitials(user: UserSummary): string {
  const source = user.fullName?.trim() || user.email || '?';
  const parts = source.split(/[\s@.]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? '?') + (parts[1]?.[0] ?? '')).toUpperCase();
}
