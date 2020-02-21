import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnBillPage } from './return-bill.page';

describe('ReturnBillPage', () => {
  let component: ReturnBillPage;
  let fixture: ComponentFixture<ReturnBillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnBillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnBillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
