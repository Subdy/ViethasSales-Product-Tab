import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCartPage } from './return-cart.page';

describe('ReturnCartPage', () => {
  let component: ReturnCartPage;
  let fixture: ComponentFixture<ReturnCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnCartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
