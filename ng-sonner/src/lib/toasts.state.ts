import { Injectable, signal } from '@angular/core';

import { InternalToastOptions } from './types';

@Injectable({ providedIn: 'root' })
export class ToastsState {
  public readonly toasts = signal<InternalToastOptions[]>([]);

  addToast(toast: InternalToastOptions): void {
    this.toasts.update((toasts) => [
      ...toasts,
      toast
    ]);
  }

  removeToast(id: number): void {
    this.toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }
}
