import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericDataTable } from './generic-data-table';

describe('GenericDataTable', () => {
  let component: GenericDataTable<object>;
  let fixture: ComponentFixture<GenericDataTable<object>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericDataTable],
    }).compileComponents();

    fixture = TestBed.createComponent(GenericDataTable);
    fixture.componentRef.setInput('data', []);
    fixture.componentRef.setInput('columns', []);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
