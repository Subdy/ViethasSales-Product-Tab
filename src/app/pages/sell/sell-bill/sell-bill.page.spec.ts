import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellBillPage } from './sell-bill.page';

describe('SellBillPage', () => {
  let component: SellBillPage;
  let fixture: ComponentFixture<SellBillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellBillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellBillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
