import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCostPage } from './report-cost.page';

describe('ReportCostPage', () => {
  let component: ReportCostPage;
  let fixture: ComponentFixture<ReportCostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
