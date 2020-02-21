import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAddPage } from './supplier-add.page';

describe('SupplierAddPage', () => {
  let component: SupplierAddPage;
  let fixture: ComponentFixture<SupplierAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
