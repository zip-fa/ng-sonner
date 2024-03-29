import { inject, Injectable } from '@angular/core';

import {
  CreatedToast,
  InternalToastOptions,
  ToastContent,
  ToastOptions
} from './types';
import { SONNER_OPTIONS_TOKEN } from './tokens';
import { ToastsState } from './toasts.state';

type CreateToastOptions = Omit<InternalToastOptions,
  'id' |
  'nonStringContent' |
  'isAsync' |
  'isRemoved' |
  'isSwiping' |
  'isSwipingOut' |
  'isRendered' |
  'initialHeight' |
  'offset' |
  'offsetBeforeRemove'
>;

@Injectable({ providedIn: 'root' })
export class SonnerService {
  private readonly options = inject(SONNER_OPTIONS_TOKEN);
  private readonly state = inject(ToastsState);

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

  private create(options: CreateToastOptions): CreatedToast {
    this.lastId++;

    const toast: InternalToastOptions = {
      id: this.lastId,
      nonStringContent: typeof options.content !== 'string',
      isAsync: false, // TODO
      isRemoved: false,
      isSwiping: false,
      isSwipingOut: false,
      isRendered: false,
      initialHeight: 0,
      offset: 0,
      offsetBeforeRemove: 0,
      ...options
    };

    this.state.addToast(toast);

    return this.lastId;
  }
}
