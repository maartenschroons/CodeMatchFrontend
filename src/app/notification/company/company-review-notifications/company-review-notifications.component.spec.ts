import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyReviewNotificationsComponent } from './company-review-notifications.component';

describe('CompanyReviewNotificationsComponent', () => {
  let component: CompanyReviewNotificationsComponent;
  let fixture: ComponentFixture<CompanyReviewNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyReviewNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyReviewNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
