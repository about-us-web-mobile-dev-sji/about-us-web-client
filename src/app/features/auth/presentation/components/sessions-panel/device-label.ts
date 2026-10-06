import type { ActiveSession } from '../../../domain/models/active-session.model';

const BROWSERS: [RegExp, string][] = [
  [/Edg\//, 'Edge'],
  [/OPR\/|Opera/, 'Opera'],
  [/Firefox\//, 'Firefox'],
  [/Chrome\//, 'Chrome'],
  [/Safari\//, 'Safari'],
];
const SYSTEMS: [RegExp, string][] = [
  [/Android/, 'Android'],
  [/iPhone|iPad|iOS/, 'iOS'],
  [/Windows/, 'Windows'],
  [/Mac OS X|Macintosh/, 'macOS'],
  [/Linux/, 'Linux'],
];

/** Short human label, e.g. "Firefox · Linux" or "Application mobile". */
export function deviceLabel(session: ActiveSession): string {
  const agent = session.userAgent ?? '';
  const browser = BROWSERS.find(([pattern]) => pattern.test(agent))?.[1];
  const system = SYSTEMS.find(([pattern]) => pattern.test(agent))?.[1];
  const label = [browser, system].filter(Boolean).join(' · ');
  if (label) return label;
  return session.clientType === 'MOBILE'
    ? $localize`:@@auth.sessions.mobileApp:Application mobile`
    : $localize`:@@auth.sessions.unknownBrowser:Navigateur inconnu`;
}
