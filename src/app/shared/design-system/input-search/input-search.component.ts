import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.sass',
})
export class InputSearchComponent {
  @Output() setValueAction: EventEmitter<string> = new EventEmitter<string>();
  @Input() disabled: boolean = false;

  value: string = '';

  setValue(): void {
    this.setValueAction.emit(this.value);
  }
}
