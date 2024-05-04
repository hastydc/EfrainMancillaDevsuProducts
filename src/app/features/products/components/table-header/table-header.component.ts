import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { InputSearchComponent } from '../../../../shared/design-system/input-search/input-search.component';
import { ButtonComponent } from '../../../../shared/design-system/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-header',
  standalone: true,
  imports: [InputSearchComponent, ButtonComponent],
  templateUrl: './table-header.component.html',
  styleUrl: './table-header.component.sass',
})
export class TableHeaderComponent {
  @Output() setSearchAction: EventEmitter<string> = new EventEmitter<string>();
  @Input() loading: boolean = false;

  private readonly router: Router = inject(Router);

  goToAdd(): void {
    this.router.navigate(['products/add']);
  }

  setSearch(value: string): void {
    this.setSearchAction.emit(value);
  }
}
