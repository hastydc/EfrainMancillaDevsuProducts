import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { ProductsFormComponent } from './products-form.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  TranslateModuleMock,
  defaultProduct,
} from '../../../shared/utils.mock';
import { ProductFormKey } from '../../../models/productFormKey.enum';
import { ProductsService } from '../products.service';
import { defaultIfEmpty, of, throwError } from 'rxjs';

describe('ProductsFormComponent', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsFormComponent, HttpClientModule, TranslateModuleMock],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initParams isAdd', () => {
    (component as any).activatedRoute.snapshot = {
      data: { isAdd: true },
      params: { id: '1' },
    } as any;
    fixture.detectChanges();

    component.initParams();

    expect(component.title).toEqual('registerForm');
  });

  it('initForm', () => {
    component.product = defaultProduct;
    component.initForm();

    expect(component.form.get(ProductFormKey.RELEASE_DATE)?.value).toEqual(
      '2025-12-02'
    );
  });

  it('disableFields', () => {
    const spy = spyOn(component.form, 'get').and.callThrough();
    component.isAdd = true;

    component.disableFields();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('watchFields', fakeAsync(() => {
    TestBed.inject(ProductsService).validate = jasmine
      .createSpy()
      .and.returnValue(of(true));
    const spyForm = spyOn(component.form, 'get').and.callThrough();
    const spyFn = spyOn(component, 'validateIdField').and.callThrough();
    component.isAdd = true;
    component.watchFields();
    component.initForm();

    component.form
      .get(ProductFormKey.RELEASE_DATE)
      ?.setValue(defaultProduct.date_release);

    component.form.get(ProductFormKey.ID)?.setValue(defaultProduct.id);

    tick(2000);
    flush();

    expect(spyForm).toHaveBeenCalledTimes(2);
    expect(spyFn).toHaveBeenCalledWith(defaultProduct.id);
  }));

  it('validateField error', () => {
    const spy = spyOn(
      (component as any).toastService,
      'setData'
    ).and.callThrough();
    TestBed.inject(ProductsService).validate = jasmine
      .createSpy()
      .and.returnValue(throwError(() => ({ status: 400 })));

    component.validateIdField('1');

    expect(spy).toHaveBeenCalledWith({
      show: true,
      error: true,
      text: 'headerAuthorIdIsMissing',
    });
  });

  it('validateField false', () => {
    const spy = spyOn(component.form, 'get').and.callThrough();
    TestBed.inject(ProductsService).validate = jasmine
      .createSpy()
      .and.returnValue(of(false));

    component.validateIdField('1');

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('save', () => {
    const spy = spyOn(
      (component as any).toastService,
      'setData'
    ).and.callThrough();
    TestBed.inject(ProductsService).post = jasmine
      .createSpy()
      .and.returnValue(of(defaultProduct));
    component.isAdd = true;
    component.save();

    expect(component.loading).toBeFalse();
    expect(spy).toHaveBeenCalledWith({
      show: true,
      text: 'successful',
    });
  });

  it('save edit', () => {
    const spy = spyOn(
      (component as any).toastService,
      'setData'
    ).and.callThrough();
    TestBed.inject(ProductsService).put = jasmine
      .createSpy()
      .and.returnValue(of(defaultProduct));
    component.isAdd = false;
    component.save();

    expect(component.loading).toBeFalse();
    expect(spy).toHaveBeenCalledWith({
      show: true,
      text: 'successful',
    });
  });

  it('save error', () => {
    const spy = spyOn(
      (component as any).toastService,
      'setData'
    ).and.callThrough();
    TestBed.inject(ProductsService).post = jasmine
      .createSpy()
      .and.returnValue(throwError(() => ({ status: 400 })));
    component.isAdd = true;
    component.save();

    expect(component.loading).toBeFalse();
    expect(spy).toHaveBeenCalledWith({
      show: true,
      error: true,
      text: 'headerAuthorIdIsMissing',
    });
  });

  it('getProduct', () => {
    TestBed.inject(ProductsService).validate = jasmine
      .createSpy()
      .and.returnValue(of(true));
    TestBed.inject(ProductsService).get = jasmine
      .createSpy()
      .and.returnValue(of(defaultProduct));
    component.id = '1';

    component.getProduct();

    expect(component.product).toEqual(defaultProduct);
    expect(component.loading).toBeFalse();
  });

  it('getProduct errorValidate', () => {
    TestBed.inject(ProductsService).validate = jasmine
      .createSpy()
      .and.returnValue(of(false));
    TestBed.inject(ProductsService).get = jasmine
      .createSpy()
      .and.returnValue(of(defaultProduct));
    component.id = '1';

    component.getProduct();

    expect(component.loading).toBeFalse();
  });
});
