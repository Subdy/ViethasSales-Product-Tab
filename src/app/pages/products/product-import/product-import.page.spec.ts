import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImportPage } from './product-import.page';

describe('ProductImportPage', () => {
  let component: ProductImportPage;
  let fixture: ComponentFixture<ProductImportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductImportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
