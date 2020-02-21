import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningStockPage } from './opening-stock.page';

describe('OpeningStockPage', () => {
  let component: OpeningStockPage;
  let fixture: ComponentFixture<OpeningStockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningStockPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
