import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let add: ReturnType<typeof vi.spyOn>;
  let now: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MessageService] });
    add = vi.spyOn(TestBed.inject(MessageService), 'add');
    now = vi.spyOn(Date, 'now').mockReturnValue(1_000);
    service = TestBed.inject(NotificationService);
  });

  afterEach(() => vi.restoreAllMocks());

  it('affiche un toast avec la sévérité et une durée de 6000 ms', () => {
    service.warn('Attention', 'Détail');
    expect(add).toHaveBeenCalledWith({
      severity: 'warn',
      summary: 'Attention',
      detail: 'Détail',
      life: 6000,
    });
  });

  it('ignore deux messages identiques en moins de 3 s, puis laisse passer le suivant', () => {
    service.error('Erreur', 'Serveur KO');
    now.mockReturnValue(2_000);
    service.error('Erreur', 'Serveur KO');
    expect(add).toHaveBeenCalledTimes(1);

    now.mockReturnValue(4_500);
    service.error('Erreur', 'Serveur KO');
    expect(add).toHaveBeenCalledTimes(2);
  });

  it('n’écarte pas des messages différents', () => {
    service.error('Erreur', 'A');
    service.error('Erreur', 'B');
    service.success('Erreur', 'A');
    expect(add).toHaveBeenCalledTimes(3);
  });
});
