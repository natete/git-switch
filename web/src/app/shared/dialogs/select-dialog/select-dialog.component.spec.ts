import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectDialog } from './select-dialog.component';

describe('SelectDialog', () => {
  let component: SelectDialog;
  let fixture: ComponentFixture<SelectDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
