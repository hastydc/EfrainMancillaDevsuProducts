import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../button/button.component';
import { ModalComponent } from '../modal/modal.component';
import { ToastComponent } from '../toast/toast.component';
import { Product } from '../../../models/product.interface';

@Component({
  selector: 'app-action-menu',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    ButtonComponent,
    ModalComponent,
    PortalModule,
    ToastComponent,
  ],
  templateUrl: './action-menu.component.html',
  styleUrl: './action-menu.component.sass',
})
export class ActionMenuComponent {
  @ViewChild(CdkPortal) portal!: CdkPortal;
  @Output() deleteAction: EventEmitter<Product> = new EventEmitter<Product>();
  @Input() product!: Product;

  private readonly overlay: Overlay = inject(Overlay);
  private readonly router: Router = inject(Router);

  showActions: boolean = false;
  overlayRef!: OverlayRef;

  toggleActions(): void {
    this.showActions = !this.showActions;
  }

  goToEdit(): void {
    this.router.navigate(['products/edit', this.product.id]);
  }

  deleteProduct(): void {
    this.deleteAction.emit(this.product);
    this.closeModal();
  }

  getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      hasBackdrop: true,
      width: '70%',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });
  }

  showModal(): void {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.portal);
  }

  closeModal(): void {
    this.overlayRef.dispose();
  }
}
