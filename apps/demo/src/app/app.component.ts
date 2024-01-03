import { Component, inject } from '@angular/core';

import { SonnerContainerComponent, SonnerService } from '@zip-fa/ng-sonner';

@Component({
  standalone: true,
  imports: [SonnerContainerComponent],
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
