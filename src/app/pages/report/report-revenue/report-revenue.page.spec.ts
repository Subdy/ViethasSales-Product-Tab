import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRevenuePage } from './report-revenue.page';

describe('ReportRevenuePage', () => {
  let component: ReportRevenuePage;
  let fixture: ComponentFixture<ReportRevenuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportRevenuePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRevenuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
