import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetail2Page } from './product-detail2.page';

describe('ProductDetail2Page', () => {
  let component: ProductDetail2Page;
  let fixture: ComponentFixture<ProductDetail2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetail2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetail2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
