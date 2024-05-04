import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { TranslateService } from '@ngx-translate/core';
describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
      providers: [{ provide: TranslateService, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('action', () => {
    const spy = spyOn(component.actionEvent, 'emit').and.callThrough();
    component.disabled = false;

    component.action();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('action disabled', () => {
    const spy = spyOn(component.actionEvent, 'emit').and.callThrough();
    component.disabled = true;

    component.action();

    expect(spy).toHaveBeenCalledTimes(0);
  });
});
