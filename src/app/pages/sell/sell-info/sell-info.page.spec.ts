import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellInfoPage } from './sell-info.page';

describe('SellInfoPage', () => {
  let component: SellInfoPage;
  let fixture: ComponentFixture<SellInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
