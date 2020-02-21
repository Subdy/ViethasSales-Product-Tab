import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAddPage } from './sales-add.page';

describe('SalesAddPage', () => {
  let component: SalesAddPage;
  let fixture: ComponentFixture<SalesAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
