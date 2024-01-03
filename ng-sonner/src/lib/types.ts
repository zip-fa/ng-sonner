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
  type: ToastType;
  content: ToastContent;
};

export type GlobalToastOptions = {
  dismissible: boolean;
  position: Position;
  duration: number;
  closeButton: boolean;
  richColors: boolean;
};

export type GlobalOptions = {
  visibleToastsAmount: number;
  viewportOffset: string;
  toastWidth: string;
  gap: string;
  swipeTreshold: number;
  timeBeforeUnmount: number;
};

export type ToastContent = TemplateRef<any> | Type<any> | string;

export type CreatedToast = number;
