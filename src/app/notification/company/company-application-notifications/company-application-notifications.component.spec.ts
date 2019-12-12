import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyApplicationNotificationsComponent } from './company-application-notifications.component';

describe('CompanyApplicationNotificationsComponent', () => {
  let component: CompanyApplicationNotificationsComponent;
  let fixture: ComponentFixture<CompanyApplicationNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyApplicationNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyApplicationNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
