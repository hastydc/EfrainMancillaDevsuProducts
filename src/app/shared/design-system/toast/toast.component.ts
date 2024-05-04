import {
  CdkConnectedOverlay,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, effect, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ToastService } from './toast.service';
import { Toast } from '../../../models/toast.interface';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [TranslateModule, PortalModule, CdkConnectedOverlay, CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.sass',
})
export class ToastComponent {
  @ViewChild(CdkPortal) portal!: CdkPortal;

  private readonly overlay: Overlay = inject(Overlay);
  private readonly toastService: ToastService = inject(ToastService);
  overlayRef!: OverlayRef;

  data: Toast = { show: false, text: '' };

  constructor() {
    effect(() => {
      this.data = this.toastService.getData();

      if (this.data.show) this.show();
    });
  }

  getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      hasBackdrop: false,
      width: '40%',
      positionStrategy: this.overlay
        .position()
        .global()
        .top('128px')
        .centerHorizontally(),
    });
  }

  show(): void {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.portal);

    setTimeout(() => {
      this.close();
    }, 10000);
  }

  close(): void {
    this.overlayRef.dispose();
    this.toastService.setData({ show: false });
  }
}
