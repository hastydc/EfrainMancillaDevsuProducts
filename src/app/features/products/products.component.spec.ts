import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModuleMock, defaultProduct } from '../../shared/utils.mock';
import { ProductsService } from './products.service';
import { of, throwError } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, HttpClientModule, TranslateModuleMock],
      providers: [
        {
          provide: ProductsService,
          useValue: jasmine.createSpyObj(ProductsService, {
            getAll: of([defaultProduct]),
          }),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getProducts', () => {
    component.getProducts();

    expect(component.products()[0].id).toBe('1');
  });

  it('getProducts Error', () => {
    const spy = spyOn(
      (component as any).toastService,
      'setData'
    ).and.callThrough();
    TestBed.inject(ProductsService).getAll = jasmine
      .createSpy()
      .and.returnValue(throwError(() => ({ status: 400 })));

    component.getProducts();

    expect(component.products()).toEqual([]);
    expect(spy).toHaveBeenCalledWith({
      show: true,
      error: true,
      text: 'headerAuthorIdIsMissing',
    });
  });
});
