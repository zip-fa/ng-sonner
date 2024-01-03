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
  important: boolean;
  unstyled: boolean;
  description: string;
  action: ToastAction;
}>;

export type InternalToastOptions = ToastOptions & {
  id: number;
  type: ToastType;
  content: ToastContent;
  nonStringContent: boolean;
  initialHeight: number; // TODO: consider moving this to component
  offset: number; // TODO: consider moving this to component
  offsetBeforeRemove: number; // TODO: consider moving this to component
  isAsync: boolean;
  isRemoved: boolean; // TODO: consider moving this to component
  isSwiping: boolean; // TODO: consider moving this to component
  isSwipingOut: boolean; // TODO: consider moving this to component
  isRendered: boolean; // TODO: consider moving this to component
};

export type GlobalToastOptions = {
  dismissible: boolean;
  duration: number;
  closeButton: boolean;
};

export type SonnerTheme = 'system' | 'light' | 'dark';

export type GlobalOptions = {
  visibleToasts: number;
  viewportOffset: string;
  toastWidth: string;
  gap: string;
  swipeTreshold: number;
  timeBeforeUnmount: number;
  position: Position;
  containerAriaLabel: string;
  theme: SonnerTheme;
  richColors: boolean;
  unstyled: boolean;
  expandByDefault: boolean;
  invert: boolean;
  hotKeys: string[];
  containerClassName?: string;
};

export type ToastContent = TemplateRef<any> | Type<any> | string;

export type CreatedToast = number;
