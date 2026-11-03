import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { AppError } from '../errors/app-error';
import { NotifyService } from './notify.service';

describe('NotifyService', () => {
  it('sends every notification to the global toast with a life per severity', () => {
    TestBed.configureTestingModule({ providers: [MessageService] });
    const add = vi.spyOn(TestBed.inject(MessageService), 'add');
    const notify = TestBed.inject(NotifyService);

    notify.success('Enregistré');
    notify.error('Action impossible', 'Détail');

    expect(add).toHaveBeenNthCalledWith(1, expect.objectContaining({ key: 'app', severity: 'success', summary: 'Enregistré', life: 4000 }));
    expect(add).toHaveBeenNthCalledWith(2, expect.objectContaining({ key: 'app', severity: 'error', detail: 'Détail', life: 7000 }));
  });

  it('translates a backend error code, with screen-specific overrides', () => {
    TestBed.configureTestingModule({ providers: [MessageService] });
    const add = vi.spyOn(TestBed.inject(MessageService), 'add');
    const notify = TestBed.inject(NotifyService);

    notify.fromError(new AppError('SCHOOL_NOT_FOUND', 404), 'Modification impossible');
    notify.fromError(new AppError('BAD_REQUEST', 400), 'Modification impossible', { BAD_REQUEST: 'Nom invalide.' });

    expect(add).toHaveBeenNthCalledWith(1, expect.objectContaining({ summary: 'Modification impossible', detail: 'École introuvable.' }));
    expect(add).toHaveBeenNthCalledWith(2, expect.objectContaining({ detail: 'Nom invalide.' }));
  });

  it('does nothing without a MessageService (unit tests of pages)', () => {
    expect(() => TestBed.inject(NotifyService).success('ok')).not.toThrow();
  });
});
