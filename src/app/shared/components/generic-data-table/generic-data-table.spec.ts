import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericDataTable } from './generic-data-table';

describe('GenericDataTable', () => {
  let component: GenericDataTable;
  let fixture: ComponentFixture<GenericDataTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericDataTable],
    }).compileComponents();

    fixture = TestBed.createComponent(GenericDataTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
