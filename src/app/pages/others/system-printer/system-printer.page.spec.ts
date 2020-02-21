import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPrinterPage } from './system-printer.page';

describe('SystemPrinterPage', () => {
  let component: SystemPrinterPage;
  let fixture: ComponentFixture<SystemPrinterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemPrinterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemPrinterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
