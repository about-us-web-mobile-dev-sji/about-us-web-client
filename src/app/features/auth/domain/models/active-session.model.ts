/** A signed-in device of the current user (UC-21). */
export interface ActiveSession {
  readonly id: string;
  readonly clientType: 'WEB' | 'MOBILE';
  readonly userAgent: string | null;
  readonly createdAt: Date;
  readonly lastActivityAt: Date;
  readonly expiresAt: Date;
  /** The session this browser is using. */
  readonly current: boolean;
}
