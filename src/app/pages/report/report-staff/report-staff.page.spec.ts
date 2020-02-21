import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStaffPage } from './report-staff.page';

describe('ReportCategoryPage', () => {
  let component: ReportStaffPage;
  let fixture: ComponentFixture<ReportStaffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStaffPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
