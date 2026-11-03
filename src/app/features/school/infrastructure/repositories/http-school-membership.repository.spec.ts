import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_BASE_URL } from '../../../../core/config/api.config';
import { AppError } from '../../../../core/errors/app-error';
import {
  InvitationStatus,
  canCancelInvitation,
  canResendInvitation,
} from '../../domain/models/school-membership.model';
import { HttpSchoolMembershipRepository } from './http-school-membership.repository';

const invitationDto = {
  id: 'inv-1',
  schoolId: 's1',
  email: 'prof@exemple.cm',
  status: 'PENDING' as const,
  expiresAt: '2026-11-09T10:00:00.000Z',
  createdAt: '2026-11-02T10:00:00.000Z',
  invitedBy: { id: 'u1', fullName: 'Aïcha Mbarga', email: 'aicha@ecole.cm', avatarUrl: null },
  acceptedAt: null,
  acceptedBy: null,
};

describe('HttpSchoolMembershipRepository — invitations', () => {
  let repository: HttpSchoolMembershipRepository;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), { provide: API_BASE_URL, useValue: '/api' }],
    });
    repository = TestBed.inject(HttpSchoolMembershipRepository);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('lists invitations with the status, trimmed search and pagination', async () => {
    const result = repository.listInvitations('s1', {
      status: InvitationStatus.EXPIRED,
      search: '  prof  ',
      page: 2,
      limit: 50,
    });
    const request = http.expectOne((req) => req.url === '/api/schools/s1/invitations');
    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('status')).toBe('EXPIRED');
    expect(request.request.params.get('search')).toBe('prof');
    expect(request.request.params.get('page')).toBe('2');
    expect(request.request.params.get('limit')).toBe('50');
    request.flush({ items: [invitationDto], total: 1, page: 2, limit: 50, totalPages: 1 });

    const page = await result;
    expect(page.total).toBe(1);
    expect(page.items[0].invitedBy?.fullName).toBe('Aïcha Mbarga');
    expect(page.items[0].expiresAt).toBeInstanceOf(Date);
  });

  it('omits the status and search when listing every invitation', async () => {
    const result = repository.listInvitations('s1', { page: 1, limit: 20 });
    const request = http.expectOne((req) => req.url === '/api/schools/s1/invitations');
    expect(request.request.params.has('status')).toBe(false);
    expect(request.request.params.has('search')).toBe(false);
    request.flush({ items: [], total: 0, page: 1, limit: 20, totalPages: 0 });
    expect((await result).items).toEqual([]);
  });

  it('resends an invitation without a body and maps the partial response', async () => {
    const result = repository.resendInvitation('s1', 'inv-1');
    const request = http.expectOne('/api/schools/s1/invitations/inv-1/resend');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toBeNull();
    request.flush({ id: 'inv-2', schoolId: 's1', email: 'prof@exemple.cm', status: 'PENDING', expiresAt: '2026-11-09T10:00:00.000Z' });

    const invitation = await result;
    expect(invitation.id).toBe('inv-2');
    expect(invitation.invitedBy).toBeNull();
    expect(invitation.createdAt).toBeNull();
  });

  it('cancels an invitation with DELETE', async () => {
    const result = repository.cancelInvitation('s1', 'inv-1');
    const request = http.expectOne('/api/schools/s1/invitations/inv-1');
    expect(request.request.method).toBe('DELETE');
    request.flush({ ...invitationDto, status: 'CANCELLED' });
    expect((await result).status).toBe(InvitationStatus.CANCELLED);
  });

  it('sends a first invitation with the e-mail only, normalised', async () => {
    const result = repository.inviteMember('s1', { email: '  Prof@Exemple.CM ' });
    const request = http.expectOne('/api/schools/s1/invitations');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ email: 'prof@exemple.cm' });
    request.flush({ email: 'prof@exemple.cm', expiresAt: '2026-11-09T10:00:00.000Z' });
    expect((await result).email).toBe('prof@exemple.cm');
  });

  it('turns backend errors into AppError with their code', async () => {
    const result = repository.cancelInvitation('s1', 'inv-1');
    http
      .expectOne('/api/schools/s1/invitations/inv-1')
      .flush({ code: 'SCHOOL_INVITATION_INVALID', message: 'not pending' }, { status: 400, statusText: 'Bad Request' });
    await expect(result).rejects.toMatchObject({ code: 'SCHOOL_INVITATION_INVALID', status: 400 });
    await expect(result).rejects.toBeInstanceOf(AppError);
  });
});

describe('invitation actions by status', () => {
  it('allows resending anything but an accepted invitation', () => {
    expect(canResendInvitation(InvitationStatus.PENDING)).toBe(true);
    expect(canResendInvitation(InvitationStatus.EXPIRED)).toBe(true);
    expect(canResendInvitation(InvitationStatus.CANCELLED)).toBe(true);
    expect(canResendInvitation(InvitationStatus.ACCEPTED)).toBe(false);
  });

  it('allows cancelling only pending or expired invitations', () => {
    expect(canCancelInvitation(InvitationStatus.PENDING)).toBe(true);
    expect(canCancelInvitation(InvitationStatus.EXPIRED)).toBe(true);
    expect(canCancelInvitation(InvitationStatus.ACCEPTED)).toBe(false);
    expect(canCancelInvitation(InvitationStatus.CANCELLED)).toBe(false);
  });
});
