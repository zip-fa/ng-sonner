import { TemplateRef, Type } from '@angular/core';

export type ToastType = 'normal' |
  'action' |
  'success' |
  'info' |
  'warning' |
  'error' |
  'loading' |
  'default';

export type Position = 'top-left' |
  'top-right' |
  'bottom-left' |
  'bottom-right' |
  'top-center' |
  'bottom-center';

export type ToastAction = {
  label: string;
  onClick: () => void;
};

export type ToastOptions = GlobalToastOptions & Partial<{
  description: string;
  action: ToastAction;
}>;

export type InternalToastOptions = ToastOptions & {
  id: number;
  type: ToastType;
  content: ToastContent;
};

export type GlobalToastOptions = {
  dismissible: boolean;
  duration: number;
  closeButton: boolean;
};

export type SonnerTheme = 'system' | 'light' | 'dark';

export type GlobalOptions = {
  visibleToastsAmount: number;
  viewportOffset: string;
  toastWidth: string;
  gap: string;
  swipeTreshold: number;
  timeBeforeUnmount: number;
  position: Position;
  containerAriaLabel: string;
  theme: SonnerTheme;
  richColors: boolean;
  expandByDefault: boolean;
  invert: boolean;
  hotKeys: string[];
  containerClassName?: string;
};

export type ToastContent = TemplateRef<any> | Type<any> | string;

export type CreatedToast = number;
