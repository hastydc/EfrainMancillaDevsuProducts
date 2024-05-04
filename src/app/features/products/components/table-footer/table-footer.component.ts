import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table-footer',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './table-footer.component.html',
  styleUrl: './table-footer.component.sass',
})
export class TableFooterComponent {
  @Output() setPaginatorAction: EventEmitter<number> =
    new EventEmitter<number>();

  @Input() loading: boolean = false;

  @Input() results: number = 0;

  paginator: number[] = [5, 10, 20];

  value: number = 5;

  setPaginator(): void {
    this.setPaginatorAction.emit(this.value);
  }
}
