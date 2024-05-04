import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFooterComponent } from './table-footer.component';
import { TranslateModuleMock } from '../../../../shared/utils.mock';

describe('TableFooterComponent', () => {
  let component: TableFooterComponent;
  let fixture: ComponentFixture<TableFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableFooterComponent, TranslateModuleMock],
    }).compileComponents();

    fixture = TestBed.createComponent(TableFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setPaginator', () => {
    const spy = spyOn(component.setPaginatorAction, 'emit').and.callThrough();
    component.setPaginator();

    expect(spy).toHaveBeenCalledWith(5);
  });
});
