import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnInfoPage } from './return-info.page';

describe('ReturnInfoPage', () => {
  let component: ReturnInfoPage;
  let fixture: ComponentFixture<ReturnInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
