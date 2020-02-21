import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProductListPage } from './category-product-list.page';

describe('CategoryProductListPage', () => {
  let component: CategoryProductListPage;
  let fixture: ComponentFixture<CategoryProductListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryProductListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryProductListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
