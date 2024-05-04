import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionMenuComponent } from './action-menu.component';
import { TranslateModuleMock, defaultProduct } from '../../utils.mock';
import { of } from 'rxjs';

describe('ActionMenuComponent', () => {
  let component: ActionMenuComponent;
  let fixture: ComponentFixture<ActionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionMenuComponent, TranslateModuleMock],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionMenuComponent);
    component = fixture.componentInstance;
    component.product = defaultProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleActions', () => {
    component.showActions = true;

    component.toggleActions();

    expect(component.showActions).toBeFalse();
  });

  it('goToEdit', () => {
    const spy = spyOn((component as any).router, 'navigate').and.returnValue(
      of(true)
    );
    component.goToEdit();

    expect(spy).toHaveBeenCalledWith(['products/edit', defaultProduct.id]);
  });

  it('deleteProduct', () => {
    const spy = spyOn(component.deleteAction, 'emit').and.callThrough();
    component.showModal();
    component.deleteProduct();

    expect(spy).toHaveBeenCalledWith(defaultProduct);
  });
});
