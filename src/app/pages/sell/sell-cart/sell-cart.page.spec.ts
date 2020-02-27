import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCartPage } from './sell-cart.page';

describe('SellCartPage', () => {
  let component: SellCartPage;
  let fixture: ComponentFixture<SellCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SellCartPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
