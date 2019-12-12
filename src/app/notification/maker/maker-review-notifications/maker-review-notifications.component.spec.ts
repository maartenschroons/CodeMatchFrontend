import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerReviewNotificationsComponent } from './maker-review-notifications.component';

describe('MakerReviewNotificationsComponent', () => {
  let component: MakerReviewNotificationsComponent;
  let fixture: ComponentFixture<MakerReviewNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerReviewNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerReviewNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
