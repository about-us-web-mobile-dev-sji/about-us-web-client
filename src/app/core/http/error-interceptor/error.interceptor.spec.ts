import {
  HttpClient,
  HttpContext,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { vi } from 'vitest';
import { API_BASE_URL } from '../../config/api.config';
import { NotificationService } from '../../../shared/components/notification/notification.service';
import { errorInterceptor } from './error.interceptor';
import { SKIP_ERROR_TOAST } from './skip-error-toast';

describe('errorInterceptor', () => {
  const notifications = { error: vi.fn(), warn: vi.fn(), success: vi.fn() };
  let http: HttpClient;
  let controller: HttpTestingController;

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '/api' },
        { provide: NotificationService, useValue: notifications },
      ],
    });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => controller.verify());

  async function fail(
    url: string,
    respond: (req: ReturnType<HttpTestingController['expectOne']>) => void,
    context?: HttpContext,
  ): Promise<unknown> {
    const result = firstValueFrom(http.get(url, { context })).then(
      () => undefined,
      (error: unknown) => error,
    );
    respond(controller.expectOne(url));
    return result;
  }

  it('500 : toast error générique et erreur relancée', async () => {
    const error = await fail('/api/x', (r) =>
      r.flush({ code: 'E', message: 'secret', details: null }, { status: 500, statusText: 'KO' }),
    );
    expect(error).toBeInstanceOf(HttpErrorResponse);
    expect((error as HttpErrorResponse).status).toBe(500);
    expect(notifications.error).toHaveBeenCalledWith(
      'Erreur',
      'Une erreur interne est survenue. Réessayez plus tard.',
    );
    expect(notifications.warn).not.toHaveBeenCalled();
  });

  it('400 avec details.messages : toast warn listant les messages', async () => {
    const error = await fail('/api/x', (r) =>
      r.flush(
        { code: 'V', message: 'Validation', details: { messages: ['Nom requis', 'Code invalide'] } },
        { status: 400, statusText: 'Bad Request' },
      ),
    );
    expect(error).toBeInstanceOf(HttpErrorResponse);
    expect(notifications.warn).toHaveBeenCalledWith('Attention', 'Nom requis\nCode invalide');
    expect(notifications.error).not.toHaveBeenCalled();
  });

  it('status 0 : toast error réseau', async () => {
    const error = await fail('/api/x', (r) => r.error(new ProgressEvent('error')));
    expect((error as HttpErrorResponse).status).toBe(0);
    expect(notifications.error).toHaveBeenCalledWith(
      'Erreur',
      'Impossible de joindre le serveur. Vérifiez votre connexion.',
    );
  });

  it('401 : toast warn de repli, sans redirection', async () => {
    const error = await fail('/api/x', (r) =>
      r.flush(null, { status: 401, statusText: 'Unauthorized' }),
    );
    expect((error as HttpErrorResponse).status).toBe(401);
    expect(notifications.warn).toHaveBeenCalledWith(
      'Attention',
      'Session expirée ou non authentifié.',
    );
  });

  it('ignore les requêtes hors API_BASE_URL (erreur relancée, pas de toast)', async () => {
    const error = await fail('https://autre.exemple/x', (r) =>
      r.flush(null, { status: 500, statusText: 'KO' }),
    );
    expect(error).toBeInstanceOf(HttpErrorResponse);
    expect(notifications.error).not.toHaveBeenCalled();
    expect(notifications.warn).not.toHaveBeenCalled();
  });

  it('respecte SKIP_ERROR_TOAST (erreur relancée, pas de toast)', async () => {
    const error = await fail(
      '/api/x',
      (r) => r.flush(null, { status: 404, statusText: 'Not Found' }),
      new HttpContext().set(SKIP_ERROR_TOAST, true),
    );
    expect((error as HttpErrorResponse).status).toBe(404);
    expect(notifications.warn).not.toHaveBeenCalled();
    expect(notifications.error).not.toHaveBeenCalled();
  });
});
