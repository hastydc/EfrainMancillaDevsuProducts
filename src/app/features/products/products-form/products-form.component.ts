import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InputTextComponent } from '../../../shared/design-system/input-text/input-text.component';
import { InputDateComponent } from '../../../shared/design-system/input-date/input-date.component';
import { ButtonComponent } from '../../../shared/design-system/button/button.component';
import { LoadingComponent } from '../../../shared/design-system/loading/loading.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputData } from '../../../models/inputData.interface';
import { ToastService } from '../../../shared/design-system/toast/toast.service';
import { Product, ProductForm } from '../../../models/product.interface';
import { ProductsService } from '../products.service';
import { debounceTime, finalize, of, switchMap, throwError } from 'rxjs';
import { devsuFormatDate, getToastByError } from '../../../shared/utils';
import { ProductFormKey } from '../../../models/productFormKey.enum';
import { getInputs } from './products-form.constants';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    InputTextComponent,
    InputDateComponent,
    ButtonComponent,
    LoadingComponent,
    TranslateModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.sass',
})
export class ProductsFormComponent implements OnInit {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly productsService: ProductsService = inject(ProductsService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  productKey = ProductFormKey;
  id: string = '';
  isAdd: boolean = false;
  title: string = '';
  inputs: InputData[] = [];
  product?: Product;
  loading: boolean = false;
  form!: FormGroup;

  ngOnInit(): void {
    this.initParams();
    this.getProduct();
  }

  initParams(): void {
    this.id = this.activatedRoute?.snapshot?.params['id'];
    this.isAdd = this.activatedRoute?.snapshot?.data['isAdd'];
    this.title = `${this.isAdd ? 'register' : 'edit'}Form`;
    this.inputs = getInputs();
  }

  initForm(): void {
    this.form = this.formBuilder.group<ProductForm>({
      [ProductFormKey.ID]: [
        this.product?.id ?? '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],

      [ProductFormKey.NAME]: [
        this.product?.name ?? '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],

      [ProductFormKey.DESCRIPTION]: [
        this.product?.description ?? '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],

      [ProductFormKey.LOGO]: [this.product?.logo ?? '', [Validators.required]],

      [ProductFormKey.RELEASE_DATE]: [
        this.product?.date_release
          ? new Date(this.product!.date_release).toISOString().split('T')[0]
          : '',
        [Validators.required],
      ],

      [ProductFormKey.RESTRUCTURING_DATE]: [
        this.product?.date_revision
          ? new Date(this.product!.date_revision).toISOString().split('T')[0]
          : '',
        [Validators.required],
      ],
    });

    this.disableFields();
    this.watchFields();
  }

  disableFields(): void {
    this.form.get(ProductFormKey.RESTRUCTURING_DATE)?.disable();

    if (this.isAdd) return;

    this.form.get(ProductFormKey.ID)?.disable();
  }

  getRestructuringDate(value: string): string {
    const newDate = new Date(value);
    newDate.setFullYear(newDate.getFullYear() + 1);

    return newDate.toISOString().split('T')[0];
  }

  watchFields(): void {
    this.form
      .get(ProductFormKey.RELEASE_DATE)
      ?.valueChanges.subscribe((value: string) => {
        this.form
          .get(ProductFormKey.RESTRUCTURING_DATE)
          ?.setValue(this.getRestructuringDate(value));
      });

    if (!this.isAdd) return;

    this.form
      .get(ProductFormKey.ID)
      ?.valueChanges.pipe(debounceTime(1000))
      .subscribe((value: string) => {
        this.validateIdField(value);
      });
  }

  getProduct(): void {
    if (!this.id) return this.initForm();

    this.loading = true;
    this.productsService
      .validate(this.id)
      .pipe(
        switchMap((response) => {
          if (!response) return throwError(() => ({ status: 404 }));

          return this.productsService.get(this.id);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.product = response as Product;

          this.initForm();
        },
        error: (e) => {
          this.toastService.setData(getToastByError(e));
        },
      });
  }

  validateIdField(id: string): void {
    this.productsService
      .validate(id)
      .pipe(
        switchMap((response) => {
          return of(response);
        })
      )
      .subscribe({
        next: (response) => {
          if (!response) return;

          this.form.get(ProductFormKey.ID)?.setErrors({ notAvailable: true });
        },
        error: (e) => {
          this.toastService.setData(getToastByError(e));
        },
      });
  }

  restart(): void {
    if (this.isAdd) return this.form.reset();

    this.getProduct();
  }

  save(): void {
    this.loading = true;

    const request = this.isAdd
      ? this.productsService.post(this.form.getRawValue())
      : this.productsService.put(this.form.getRawValue());

    request
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          this.toastService.setData({
            show: true,
            text: 'successful',
          });
          this.restart();
        },
        error: (e) => {
          this.toastService.setData(getToastByError(e));
        },
      });
  }
}
