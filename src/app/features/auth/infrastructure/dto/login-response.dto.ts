export interface LoginResponseDto {
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    globalRole: 'SUPER_ADMIN' | 'USER';
  };
  sessionId: string;
}
