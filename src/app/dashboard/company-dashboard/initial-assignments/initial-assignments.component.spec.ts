import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialAssignmentsComponent } from './initial-assignments.component';

describe('InitialAssignmentsComponent', () => {
  let component: InitialAssignmentsComponent;
  let fixture: ComponentFixture<InitialAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
