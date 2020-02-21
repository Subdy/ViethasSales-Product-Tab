import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierListPage } from './supplier-list.page';

describe('SupplierListPage', () => {
  let component: SupplierListPage;
  let fixture: ComponentFixture<SupplierListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
