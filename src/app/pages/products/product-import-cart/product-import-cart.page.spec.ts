import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImportCartPage } from './product-import-cart.page';

describe('ProductImportCartPage', () => {
  let component: ProductImportCartPage;
  let fixture: ComponentFixture<ProductImportCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductImportCartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImportCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
