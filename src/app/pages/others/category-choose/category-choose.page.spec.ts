import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryChoosePage } from './category-choose.page';

describe('CategoryChoosePage', () => {
  let component: CategoryChoosePage;
  let fixture: ComponentFixture<CategoryChoosePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryChoosePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryChoosePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
