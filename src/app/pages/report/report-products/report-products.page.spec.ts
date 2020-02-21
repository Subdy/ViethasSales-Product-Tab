import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProductsPage } from './report-products.page';

describe('ReportCategoryPage', () => {
  let component: ReportProductsPage;
  let fixture: ComponentFixture<ReportProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportProductsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
