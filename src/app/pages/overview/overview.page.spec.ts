import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverViewPage } from './overview.page';

describe('OverViewPage', () => {
  let component: OverViewPage;
  let fixture: ComponentFixture<OverViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
