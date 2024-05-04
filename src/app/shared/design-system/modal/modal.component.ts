import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.sass',
})
export class ModalComponent {
  @Output() cancelEvent: EventEmitter<void> = new EventEmitter<void>();

  @Output() confirmEvent: EventEmitter<void> = new EventEmitter<void>();

  cancel(): void {
    this.cancelEvent.emit();
  }

  confirm(): void {
    this.confirmEvent.emit();
  }
}
