import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input
} from '@angular/core';

import { InternalToastOptions, Position } from '../../types';
import { SONNER_OPTIONS_TOKEN } from '../../tokens';
import { ToastsState } from '../../toasts.state';

@Component({
  selector: 'sonner-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent implements AfterViewInit {
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly state = inject(ToastsState);

  @Input({ required: true })
  public toast!: InternalToastOptions;

  @Input({ required: true })
  public position!: Position;

  @Input({ required: true })
  public interacting!: boolean;

  @Input({ required: true })
  public expanded!: boolean;

  ngAfterViewInit(): void {
    this.state.updateToast(this.toast.id, {
      isRendered: true
    });
  }
}
