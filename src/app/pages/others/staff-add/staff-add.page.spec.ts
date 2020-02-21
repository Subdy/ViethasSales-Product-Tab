import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAddPage } from './staff-add.page';

describe('StaffAddPage', () => {
  let component: StaffAddPage;
  let fixture: ComponentFixture<StaffAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
