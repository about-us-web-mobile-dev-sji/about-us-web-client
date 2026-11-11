import {
  DestroyRef,
  Injector,
  type Signal,
  assertInInjectionContext,
  inject,
  signal,
} from '@angular/core';
import {
  type MonoTypeOperatorFunction,
  Observable,
  type Subscribable,
} from 'rxjs';

export function takeUntilDestroyed<T>(
  destroyRef?: DestroyRef,
): MonoTypeOperatorFunction<T> {
  const ref = destroyRef ?? inject(DestroyRef);
  return (source) =>
    new Observable<T>((subscriber) => {
      const subscription = source.subscribe(subscriber);
      ref.onDestroy(() => subscription.unsubscribe());
      return subscription;
    });
}

export function toSignal<T>(
  source: Observable<T> | Subscribable<T>,
  options: { initialValue: T; injector?: Injector },
): Signal<T> {
  if (!options.injector) {
    assertInInjectionContext(toSignal);
  }
  const destroyRef = (options.injector ?? inject(Injector)).get(DestroyRef);
  const state = signal(options.initialValue);
  const subscription = source.subscribe({
    next: (value) => state.set(value),
    error: (error) => {
      throw error;
    },
  });
  destroyRef.onDestroy(() => subscription.unsubscribe());
  return state.asReadonly();
}
