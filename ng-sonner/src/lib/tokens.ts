import { InjectionToken, Provider } from '@angular/core';

import { GlobalToastOptions, GlobalOptions } from './types';

const DEFAULT_TOAST_OPTIONS: GlobalToastOptions = {
  position: 'bottom-right',
  duration: 4000,
  closeButton: false,
  richColors: false,
  dismissible: true
};

const DEFAULT_OPTIONS: GlobalOptions = {
  visibleToastsAmount: 3,
  viewportOffset: '32px',
  toastWidth: '356px',
  gap: '14px',
  swipeTreshold: 20,
  timeBeforeUnmount: 200
};

type ProvidedOptions = {
  globalToastOptions: GlobalToastOptions;
  globalOptions: GlobalOptions;
};

export const SONNER_OPTIONS_TOKEN = new InjectionToken<ProvidedOptions>('SONNER_OPTIONS_TOKEN', {
  factory: () => {
    return {
      globalToastOptions: DEFAULT_TOAST_OPTIONS,
      globalOptions: DEFAULT_OPTIONS
    };
  }
});

export function provideSonnerOptions(globalToastOptions: Partial<GlobalToastOptions>, globalOptions: Partial<GlobalOptions>): Provider[] {
  return [
    {
      provide: SONNER_OPTIONS_TOKEN,
      useValue: {
        globalToastOptions: {
          ...DEFAULT_TOAST_OPTIONS,
          ...globalToastOptions
        },
        globalOptions: {
          ...DEFAULT_OPTIONS,
          ...globalOptions
        }
      }
    }
  ];
}
