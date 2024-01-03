import { InjectionToken, Provider } from '@angular/core';

import { GlobalToastOptions, GlobalOptions } from './types';

const DEFAULT_TOAST_OPTIONS: GlobalToastOptions = {
  duration: 4000,
  closeButton: false,
  dismissible: true
};

const DEFAULT_OPTIONS: GlobalOptions = {
  visibleToasts: 3,
  viewportOffset: '32px',
  toastWidth: '356px',
  gap: '14px',
  swipeTreshold: 20,
  timeBeforeUnmount: 200,
  position: 'bottom-right',
  containerAriaLabel: 'Notifications alt+T',
  hotKeys: ['altKey', 'KeyT'],
  theme: 'light',
  richColors: false,
  expandByDefault: false,
  invert: false,
  unstyled: false
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
