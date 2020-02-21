import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOutputPage } from './report-output.page';

describe('ReportOutputPage', () => {
  let component: ReportOutputPage;
  let fixture: ComponentFixture<ReportOutputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOutputPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOutputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
