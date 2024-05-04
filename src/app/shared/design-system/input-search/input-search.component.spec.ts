import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchComponent } from './input-search.component';
import { TranslateModuleMock } from '../../utils.mock';

describe('InputSearchComponent', () => {
  let component: InputSearchComponent;
  let fixture: ComponentFixture<InputSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSearchComponent, TranslateModuleMock],
    }).compileComponents();

    fixture = TestBed.createComponent(InputSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setValue', () => {
    const spy = spyOn(component.setValueAction, 'emit').and.callThrough();
    component.value = '1';

    component.setValue();

    expect(spy).toHaveBeenCalledWith('1');
  });
});
