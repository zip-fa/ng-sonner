import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input
} from '@angular/core';

import { InternalToastOptions, Position } from '../../types';
import { SONNER_OPTIONS_TOKEN } from '../../tokens';

@Component({
  selector: 'sonner-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly options = inject(SONNER_OPTIONS_TOKEN);

  @Input({ required: true })
  public toast!: InternalToastOptions;

  @Input({ required: true })
  public position!: Position;

  @Input({ required: true })
  public interacting!: boolean;

  @Input({ required: true })
  public expanded!: boolean;

  // expandByDefault={expand} <-- from globalOptions
  // gap={gap}
  // style={toastOptions?.style}
  // unstyled={toastOptions?.unstyled}
  // classNames={toastOptions?.classNames}
  // cancelButtonStyle={toastOptions?.cancelButtonStyle}
  // actionButtonStyle={toastOptions?.actionButtonStyle}
  // duration={toastOptions?.duration ?? duration}
  // className={toastOptions?.className}
  // descriptionClassName={toastOptions?.descriptionClassName}
  // invert={invert}
  // visibleToasts={visibleToasts}
}
