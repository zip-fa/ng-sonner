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

  updateToast(id: number, data: Partial<InternalToastOptions>): void {
    this.toasts.update((toasts) => {
      const index = toasts.findIndex((toast) => toast.id === id);

      toasts[index] = {
        ...toasts[index],
        ...data
      };

      return toasts;
    });
  }

  removeToast(id: number): void {
    this.toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }
}
