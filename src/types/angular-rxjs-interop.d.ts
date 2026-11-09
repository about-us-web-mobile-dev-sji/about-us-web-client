declare module '@angular/core/rxjs-interop' {
  import type { Signal, WritableSignal } from '@angular/core';
  import type { Observable } from 'rxjs';

  export function takeUntilDestroyed(
    destroyRef?: import('@angular/core').DestroyRef,
  ): <T>(source: Observable<T>) => Observable<T>;

  export function toSignal<T>(
    source: Observable<T> | import('@angular/core').Subscribable<T>,
    options?: {
      initialValue?: T;
      requireSync?: boolean;
      injector?: import('@angular/core').Injector;
      manualCleanup?: boolean;
      rejectErrors?: boolean;
    },
  ): Signal<T | undefined> | Signal<T> | WritableSignal<T | undefined>;

  export function toObservable<T>(
    source: Signal<T>,
    options?: { injector?: import('@angular/core').Injector },
  ): Observable<T>;
}
