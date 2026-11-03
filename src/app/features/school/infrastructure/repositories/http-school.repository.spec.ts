import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_BASE_URL } from '../../../../core/config/api.config';
import { mapUpdateSchoolRequest } from '../mappers/school.mapper';
import { HttpSchoolRepository } from './http-school.repository';

const schoolDto = {
  id: 's1',
  name: 'Lycée Bilingue d’Essos',
  phoneNumber: null,
  email: 'direction@lycee-essos.cm',
  website: 'lycee-essos.cm',
  logo: null,
  status: 'ACTIVE',
  createdAt: '2026-10-01T10:00:00.000Z',
  updatedAt: '2026-11-02T10:00:00.000Z',
  createdBy: 'u1',
};

describe('HttpSchoolRepository.update', () => {
  let repository: HttpSchoolRepository;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), { provide: API_BASE_URL, useValue: '/api' }],
    });
    repository = TestBed.inject(HttpSchoolRepository);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('sends only the edited field with PATCH /schools/:id', async () => {
    const result = repository.update('s1', { website: ' lycee-essos.cm ' });
    const request = http.expectOne('/api/schools/s1');
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual({ website: 'lycee-essos.cm' });
    request.flush(schoolDto);
    expect((await result).website).toBe('lycee-essos.cm');
  });

  it('turns backend errors into AppError', async () => {
    const result = repository.update('s1', { name: 'Ab' });
    http.expectOne('/api/schools/s1').flush({ code: 'BAD_REQUEST', message: 'name too short' }, { status: 400, statusText: 'Bad Request' });
    await expect(result).rejects.toMatchObject({ code: 'BAD_REQUEST', status: 400 });
  });
});

describe('mapUpdateSchoolRequest', () => {
  it('omits absent fields, clears empty optional ones and lowercases the e-mail', () => {
    expect(mapUpdateSchoolRequest({})).toEqual({});
    expect(mapUpdateSchoolRequest({ phoneNumber: '  ' })).toEqual({ phoneNumber: null });
    expect(mapUpdateSchoolRequest({ email: ' Direction@Ecole.CM ' })).toEqual({ email: 'direction@ecole.cm' });
    expect(mapUpdateSchoolRequest({ name: '  Collège  ' })).toEqual({ name: 'Collège' });
  });
});
