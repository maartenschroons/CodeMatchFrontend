import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerAssignmentNotificationsComponent } from './maker-assignment-notifications.component';

describe('MakerAssignmentNotificationsComponent', () => {
  let component: MakerAssignmentNotificationsComponent;
  let fixture: ComponentFixture<MakerAssignmentNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerAssignmentNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerAssignmentNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
