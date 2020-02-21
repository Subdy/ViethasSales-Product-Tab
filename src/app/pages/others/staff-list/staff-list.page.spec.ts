import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffListPage } from './staff-list.page';

describe('StaffListPage', () => {
  let component: StaffListPage;
  let fixture: ComponentFixture<StaffListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
