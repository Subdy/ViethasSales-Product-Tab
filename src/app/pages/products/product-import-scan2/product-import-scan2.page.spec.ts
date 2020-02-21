import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImportScan2Page } from './product-import-scan2.page';

describe('ProductImportScan2Page', () => {
  let component: ProductImportScan2Page;
  let fixture: ComponentFixture<ProductImportScan2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductImportScan2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImportScan2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
