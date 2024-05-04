import { Component, OnInit, inject, signal } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import { Product } from '../../models/product.interface';
import { ProductsService } from './products.service';
import { finalize } from 'rxjs';
import { ToastService } from '../../shared/design-system/toast/toast.service';
import { ToastComponent } from '../../shared/design-system/toast/toast.component';
import { getToastByError } from '../../shared/utils';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TableComponent, ToastComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.sass',
})
export class ProductsComponent implements OnInit {
  private readonly productsService: ProductsService = inject(ProductsService);
  private readonly toastService: ToastService = inject(ToastService);

  products = signal<Product[]>([]);
  loading: boolean = false;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.loading = true;

    this.productsService
      .getAll()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.products.update(() => response);
        },
        error: (e) => {
          this.toastService.setData(getToastByError(e));
          this.products.update(() => []);
        },
      });
  }
}
