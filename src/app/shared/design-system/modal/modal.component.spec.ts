import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { TranslateModuleMock } from '../../utils.mock';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent, TranslateModuleMock],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cancel', () => {
    const spy = spyOn(component.cancelEvent, 'emit').and.callThrough();

    component.cancel();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('confirm', () => {
    const spy = spyOn(component.confirmEvent, 'emit').and.callThrough();

    component.confirm();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
