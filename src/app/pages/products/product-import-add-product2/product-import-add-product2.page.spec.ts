import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImportAddProduct2Page } from './product-import-add-product2.page';

describe('ProductImportAddProduct2Page', () => {
  let component: ProductImportAddProduct2Page;
  let fixture: ComponentFixture<ProductImportAddProduct2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductImportAddProduct2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImportAddProduct2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
