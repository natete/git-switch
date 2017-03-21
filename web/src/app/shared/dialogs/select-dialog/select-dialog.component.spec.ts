import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdDialog, MdDialogRef } from '@angular/material';

describe('SelectDialogComponent', () => {
  let component: MdDialog;
  let fixture: ComponentFixture<MdDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
