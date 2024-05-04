import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { HttpClientModule } from '@angular/common/http';
import {
  TranslateModuleMock,
  defaultProduct,
} from '../../../../shared/utils.mock';
import { ProductsService } from '../../products.service';
import { of, throwError } from 'rxjs';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent, HttpClientModule, TranslateModuleMock],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setPaginator', () => {
    component.setPaginator(5);

    expect(component.paginator).toEqual(5);
  });

  it('setSearch', () => {
    component.setSearch('1');

    expect(component.search).toEqual('1');
  });

  it('filterProductsBySearch description', () => {
    component.products.update(() => [defaultProduct]);
    component.search = '3';
    component.filterProductsBySearch();

    expect(component.products().length).toEqual(1);
  });

  it('filterProductsBySearch logo', () => {
    component.products.update(() => [defaultProduct]);
    component.search = '4';
    component.filterProductsBySearch();

    expect(component.products().length).toEqual(1);
  });

  it('filterProductsBySearch date_release', () => {
    component.products.update(() => [defaultProduct]);
    component.search = '5';
    component.filterProductsBySearch();

    expect(component.products().length).toEqual(1);
  });

  it('filterProductsBySearch date_revision', () => {
    component.products.update(() => [defaultProduct]);
    component.search = '6';
    component.filterProductsBySearch();

    expect(component.products().length).toEqual(1);
  });

  it('deleteProduct', () => {
    TestBed.inject(ProductsService).validate = jasmine
      .createSpy()
      .and.returnValue(of(true));

    TestBed.inject(ProductsService).delete = jasmine
      .createSpy()
      .and.returnValue(of(''));

    component.deleteProduct(defaultProduct);

    expect(component.loading).toBeFalse();
  });

  it('deleteProduct error', () => {
    TestBed.inject(ProductsService).validate = jasmine
      .createSpy()
      .and.returnValue(of(false));

    TestBed.inject(ProductsService).delete = jasmine
      .createSpy()
      .and.returnValue(of(''));

    component.deleteProduct(defaultProduct);

    expect(component.loading).toBeFalse();
  });

  it('deleteProduct error status', () => {
    TestBed.inject(ProductsService).validate = jasmine
      .createSpy()
      .and.returnValue(throwError(() => ({ status: 200 })));

    TestBed.inject(ProductsService).delete = jasmine
      .createSpy()
      .and.returnValue(of(''));

    component.deleteProduct(defaultProduct);
    expect(component.loading).toBeFalse();
  });
});
