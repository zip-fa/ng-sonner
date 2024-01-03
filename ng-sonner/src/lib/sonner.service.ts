import { inject, Injectable, signal } from '@angular/core';

import { CreatedToast, InternalToastOptions, ToastContent, ToastOptions } from './types';
import { SONNER_OPTIONS_TOKEN } from './tokens';

type Toasts = Array<ToastOptions & { id: number }>;

@Injectable({ providedIn: 'root' })
export class SonnerService {
  private readonly options = inject(SONNER_OPTIONS_TOKEN);

  public readonly toasts = signal<Toasts>([]);

  private lastId = 1;

  normal(content: ToastContent, options: Partial<ToastOptions> = {}): CreatedToast {
    return this.create({
      ...this.options.globalToastOptions,
      ...options,
      type: 'normal',
      content
    });
  }

  error(content: ToastContent, options: Partial<ToastOptions> = {}): CreatedToast {
    return this.create({
      ...this.options.globalToastOptions,
      ...options,
      content,
      type: 'error'
    });
  }

  success(content: ToastContent, options: Partial<ToastOptions> = {}): CreatedToast {
    return this.create({
      ...this.options.globalToastOptions,
      ...options,
      content,
      type: 'success'
    });
  }

  info(content: ToastContent, options: Partial<ToastOptions> = {}): CreatedToast {
    return this.create({
      ...this.options.globalToastOptions,
      ...options,
      content,
      type: 'info'
    });
  }

  warning(content: ToastContent, options: Partial<ToastOptions> = {}): CreatedToast {
    return this.create({
      ...this.options.globalToastOptions,
      ...options,
      content,
      type: 'warning'
    });
  }

  private create(options: InternalToastOptions): CreatedToast {
    this.lastId++;

    const toast = {
      id: this.lastId,
      ...options
    };


    this.toasts.update((toasts) => [
      ...toasts,
      toast
    ]);

    return this.lastId;
  }
}
