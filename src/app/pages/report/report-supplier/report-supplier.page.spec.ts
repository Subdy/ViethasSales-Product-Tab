import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSupplierPage } from './report-supplier.page';

describe('ReportCategoryPage', () => {
  let component: ReportSupplierPage;
  let fixture: ComponentFixture<ReportSupplierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSupplierPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSupplierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
