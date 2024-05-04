import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { defaultProduct, defaultProductDates } from '../../shared/utils.mock';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll', () => {
    TestBed.inject(HttpClient).get = jasmine
      .createSpy()
      .and.returnValue(of([defaultProduct]));

    service.getAll().subscribe((response) => {
      expect(response).toEqual([defaultProductDates]);
    });
  });

  it('get', () => {
    TestBed.inject(HttpClient).get = jasmine
      .createSpy()
      .and.returnValue(of([defaultProduct]));

    service.get('1').subscribe((response) => {
      expect(response).toEqual(defaultProduct);
    });
  });

  it('post', () => {
    TestBed.inject(HttpClient).post = jasmine
      .createSpy()
      .and.returnValue(of(defaultProduct));

    service.post(defaultProductDates).subscribe((response) => {
      expect(response).toEqual(defaultProduct);
    });
  });

  it('put', () => {
    TestBed.inject(HttpClient).put = jasmine
      .createSpy()
      .and.returnValue(of(defaultProduct));

    service.put(defaultProductDates).subscribe((response) => {
      expect(response).toEqual(defaultProduct);
    });
  });

  it('delete', () => {
    TestBed.inject(HttpClient).delete = jasmine
      .createSpy()
      .and.returnValue(of(''));

    service.delete('1').subscribe((response) => {
      expect(response).toEqual('');
    });
  });

  it('validate', () => {
    TestBed.inject(HttpClient).get = jasmine
      .createSpy()
      .and.returnValue(of(true));

    service.validate('1').subscribe((response) => {
      expect(response).toEqual(true);
    });
  });
});
