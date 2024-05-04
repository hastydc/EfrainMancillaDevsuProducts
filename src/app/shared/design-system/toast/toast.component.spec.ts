import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { TranslateModuleMock } from '../../utils.mock';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent, TranslateModuleMock],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show', fakeAsync(() => {
    const spyShow = spyOn(component, 'show').and.callThrough();
    const spyClose = spyOn(component, 'close').and.callThrough();
    (component as any).toastService.setData({ show: true });

    tick(11000);
    flush();

    expect(spyShow).toHaveBeenCalledTimes(1);
    expect(spyClose).toHaveBeenCalledTimes(1);
  }));
});
