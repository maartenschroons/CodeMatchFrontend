import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedAssignmentsComponent } from './completed-assignments.component';

describe('CompletedAssignmentsComponent', () => {
  let component: CompletedAssignmentsComponent;
  let fixture: ComponentFixture<CompletedAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
