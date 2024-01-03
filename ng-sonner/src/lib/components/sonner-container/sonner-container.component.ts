import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  QueryList,
  signal,
  untracked,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { DOCUMENT, NgStyle } from '@angular/common';
import { filter, fromEvent, race } from 'rxjs';

import { SONNER_OPTIONS_TOKEN } from '../../tokens';
import { ToastComponent } from '../toast/toast.component';
import { guessTheme, isNotDismissible } from '../../helpers';
import { ToastsState } from '../../toasts.state';

@Component({
  selector: 'sonner-container',
  standalone: true,
  templateUrl: './sonner-container.component.html',
  styleUrl: './sonner-container.component.scss',
  imports: [
    ToastComponent,
    NgStyle
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SonnerContainerComponent implements AfterViewInit {
  protected readonly state = inject(ToastsState);
  protected readonly options = inject(SONNER_OPTIONS_TOKEN);
  protected readonly document = inject(DOCUMENT);
  protected readonly position = this.options.globalOptions.position.split('-');
  protected readonly theme = guessTheme(this.options.globalOptions.theme);

  @ViewChildren('toastRefs')
  protected toasts!: QueryList<ElementRef<HTMLElement>>;

  @ViewChild('toastsList', { static: true })
  protected toastsList!: ElementRef<HTMLElement>;

  protected readonly expanded = signal<boolean>(false);
  protected readonly interacting = signal<boolean>(false);
  protected readonly heights = signal<Record<number, number>>({});
  protected readonly frontToastHeight = computed(() => {
    return `${ Object.values(this.heights())[0] }px`
  });

  private isFocusWithinRef = false;
  private lastFocusedElementRef: HTMLElement | null = null;
  private listeningEvents = false;

  private readonly expandedCleaner = effect(() => {
    const visibleToasts = this.state.toasts().length;

    if (visibleToasts <= 1) {
      // Ensure expanded is always false when no toasts are present / only one left
      untracked(() => this.expanded.set(false));
    }
  });

  ngAfterViewInit(): void {
    // since this component is not designed to destroy, we will not auto-unsubscribe
    this.toasts.changes
      .subscribe(() => {
        this.listenEvents(); // setup event listeners lazily (when first toast comes up)
        this.setHeights();
      });
  }

  private setHeights(): void {
    const result: Record<number, number> = {};

    this.toasts.forEach((toast) => {
      const id = Number(toast.nativeElement.dataset['dismissible'] as string);

      if (result[id]) {
        return;
      }

      const { height } = toast.nativeElement.getBoundingClientRect();

      result[id] = height;
    });

    this.heights.set(result);
  }

  private listenEvents(): void {
    if (this.listeningEvents) {
      return;
    }

    // TODO: check what needs to be wrapped with runOutsideAngular
    this.listenBlurEvent();
    this.listenFocusEvent();
    this.listenPointerEvents();
    this.listenHotkeys();
    this.listeningEvents = true;
  }

  private listenBlurEvent(): void {
    fromEvent(this.toastsList.nativeElement, 'blur')
      .subscribe((event: Event) => {
        const blurEvent = event as FocusEvent;
        const currentTarget = blurEvent.currentTarget as HTMLElement | null;
        const relatedTarget = blurEvent.relatedTarget as HTMLElement | null;

        if (!currentTarget || !relatedTarget) {
          return;
        }

        if (this.isFocusWithinRef && !currentTarget.contains(relatedTarget)) {
          this.isFocusWithinRef = false;

          if (this.lastFocusedElementRef) {
            this.lastFocusedElementRef.focus({ preventScroll: true });
            this.lastFocusedElementRef = null;
          }
        }
      });
  }

  private listenFocusEvent(): void {
    fromEvent(this.toastsList.nativeElement, 'focus')
      .subscribe((event: Event) => {
        const focusEvent = event as FocusEvent;

        if (isNotDismissible(focusEvent)) {
          return;
        }

        if (!this.isFocusWithinRef) {
          this.isFocusWithinRef = true;
          this.lastFocusedElementRef = focusEvent.relatedTarget as HTMLElement;
        }
      });
  }

  private listenPointerEvents(): void {
    console.log('listen pointers');

    const { nativeElement } = this.toastsList;

    race(
      fromEvent(nativeElement, 'mouseEnter'),
      fromEvent(nativeElement, 'mouseMove')
    )
      .subscribe(() => {
        console.log('mouseEnter / mouseMove');

        this.expanded.set(true);
      });

    fromEvent(nativeElement, 'mouseLeave')
      .pipe(filter(() => !this.interacting()))
      .subscribe(() => {
        console.log('mouseLeave');

        this.expanded.set(false);
      });

    fromEvent(nativeElement, 'pointerDown')
      .pipe(filter((event) => !isNotDismissible(event as FocusEvent)))
      .subscribe(() => this.interacting.set(true));

    fromEvent(nativeElement, 'pointerUp')
      .subscribe(() => this.interacting.set(false));
  }

  private listenHotkeys(): void {
    const { hotKeys } = this.options.globalOptions;
    const { nativeElement } = this.toastsList;

    fromEvent(nativeElement, 'keydown')
      .subscribe((event) => {
        const keyboardEvent = event as KeyboardEvent;
        const isHotkeyPressed = hotKeys.every((key) => {
          return keyboardEvent[key as keyof KeyboardEvent] ||
            keyboardEvent.code === key;
        });

        if (isHotkeyPressed) {
          this.expanded.set(true);
          nativeElement.focus();
        }

        if (
          keyboardEvent.code === 'Escape' &&
          (this.document.activeElement === nativeElement || nativeElement.contains(this.document.activeElement))
        ) {
          this.expanded.set(false);
        }
      });
  }
}
