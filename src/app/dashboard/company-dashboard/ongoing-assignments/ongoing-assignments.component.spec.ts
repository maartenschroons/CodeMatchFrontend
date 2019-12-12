import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingAssignmentsComponent } from './ongoing-assignments.component';

describe('OngoingAssignmentsComponent', () => {
  let component: OngoingAssignmentsComponent;
  let fixture: ComponentFixture<OngoingAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
