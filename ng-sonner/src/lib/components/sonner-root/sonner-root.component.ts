import { Component, computed, inject, Input } from '@angular/core';

import { SonnerService } from '../../sonner.service';

@Component({
  selector: 'sonner-root',
  standalone: true,
  imports: [],
  templateUrl: './sonner-root.component.html',
  styleUrl: './sonner-root.component.scss',
})
export class SonnerRootComponent {
  public readonly service = inject(SonnerService);

  @Input()
  public containerAriaLabel: string = 'Notifications';

  @Input()
  public hotKey: string[] = ['altKey', 'KeyT'];

  public readonly possiblePositions = computed(() => {
    const toasts = this.service.toasts();

    return Array.from(
      new Set(toasts.map((toast) => toast.position))
    );
  });
}
