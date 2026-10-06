export interface SessionResponseDto {
  id: string;
  clientType: 'WEB' | 'MOBILE';
  userAgent: string | null;
  createdAt: string;
  lastActivityAt: string;
  expiresAt: string;
  current: boolean;
}
