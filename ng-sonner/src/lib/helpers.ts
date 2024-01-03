import { SonnerTheme } from './types';

export function isNotDismissible(event: FocusEvent): boolean {
  return event.target instanceof HTMLElement &&
    event.target.dataset['dismissible'] === 'false';
}


export function guessTheme(theme: SonnerTheme, fallbackTheme: SonnerTheme = 'light'): SonnerTheme {
  if (theme !== 'system') {
    return theme;
  } else if (typeof window === 'undefined') {
    return fallbackTheme;
  } else if (window?.matchMedia('(prefers-color-scheme: dark)')?.matches) {
    return 'dark';
  }

  return 'light';
}
