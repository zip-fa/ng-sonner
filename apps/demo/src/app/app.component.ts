import { Component, inject } from '@angular/core';

import { SonnerRootComponent, SonnerService } from '@zip-fa/ng-sonner';

@Component({
  standalone: true,
  imports: [SonnerRootComponent],
  selector: 'ng-sonner-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly sonner = inject(SonnerService);

  openToast(): void {
    this.sonner.normal('hi!');
  }
}
