import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDateComponent } from './input-date.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('InputDateComponent', () => {
  let component: InputDateComponent;
  let fixture: ComponentFixture<InputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDateComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InputDateComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
