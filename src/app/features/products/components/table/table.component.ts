import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  inject,
  signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ActionMenuComponent } from '../../../../shared/design-system/action-menu/action-menu.component';
import { TableHeaderComponent } from '../table-header/table-header.component';
import { TableFooterComponent } from '../table-footer/table-footer.component';
import { TooltipComponent } from '../../../../shared/design-system/tooltip/tooltip.component';
import { Product } from '../../../../models/product.interface';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../products.service';
import { switchMap, catchError, finalize, EMPTY, of, throwError } from 'rxjs';
import { getToastByError } from '../../../../shared/utils';
import { ToastService } from '../../../../shared/design-system/toast/toast.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TranslateModule,
    ActionMenuComponent,
    TableHeaderComponent,
    TableFooterComponent,
    TooltipComponent,
    CommonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.sass',
})
export class TableComponent implements OnChanges {
  @Output() refreshAction: EventEmitter<void> = new EventEmitter<void>();
  @Input() baseProducts: Product[] = [];
  @Input() loading: boolean = false;

  private readonly productsService: ProductsService = inject(ProductsService);
  private readonly toastService: ToastService = inject(ToastService);

  products = signal<Product[]>([]);
  paginator: number = 5;
  search: string = '';

  ngOnChanges(): void {
    this.updateTable();
  }

  setProducts(): void {
    this.products.update(() => this.baseProducts);
  }

  setPaginator(value: number): void {
    this.paginator = value;
    this.updateTable();
  }

  setSearch(value: string): void {
    this.search = value;
    this.updateTable();
  }

  filterProductsBySearch(): void {
    const base = this.products();
    this.products.update(() =>
      base.filter(
        (product: Product) =>
          product.name.toLowerCase().includes(this.search.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          product.logo.toLowerCase().includes(this.search.toLowerCase()) ||
          product.date_release
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          product.date_revision
            .toLowerCase()
            .includes(this.search.toLowerCase())
      )
    );
  }

  filterProductsByPaginator(): void {
    const base = this.products();
    this.products.update(() => base.slice(0, this.paginator));
  }

  updateTable(): void {
    this.setProducts();
    this.filterProductsBySearch();
    this.filterProductsByPaginator();
  }

  deleteProduct({ id }: Product): void {
    this.loading = true;
    this.productsService
      .validate(id)
      .pipe(
        switchMap((response) => {
          if (!response) return throwError(() => ({ status: 404 }));

          return this.productsService.delete(id);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          this.refreshAction.emit();
        },
        error: (e) => {
          if (e.status !== 200) {
            this.toastService.setData(getToastByError(e));

            return;
          }

          if (e.status === 200) {
            this.toastService.setData({ show: true, text: 'successful' });
            this.refreshAction.emit();
          }
        },
      });
  }
}
