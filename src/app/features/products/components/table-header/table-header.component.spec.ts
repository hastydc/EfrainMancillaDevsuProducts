import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHeaderComponent } from './table-header.component';
import { TranslateModuleMock } from '../../../../shared/utils.mock';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('TableHeaderComponent', () => {
  let component: TableHeaderComponent;
  let fixture: ComponentFixture<TableHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableHeaderComponent, TranslateModuleMock],
    }).compileComponents();

    fixture = TestBed.createComponent(TableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('goToAdd', () => {
    const spy = spyOn((component as any).router, 'navigate').and.returnValue(
      of(true)
    );
    component.goToAdd();

    expect(spy).toHaveBeenCalledWith(['products/add']);
  });

  it('setSearch', () => {
    const spy = spyOn(component.setSearchAction, 'emit').and.callThrough();
    component.setSearch('1');

    expect(spy).toHaveBeenCalledWith('1');
  });
});
