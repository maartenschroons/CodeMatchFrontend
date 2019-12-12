import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerApplicationNotificationsComponent } from './maker-application-notifications.component';

describe('MakerApplicationNotificationsComponent', () => {
  let component: MakerApplicationNotificationsComponent;
  let fixture: ComponentFixture<MakerApplicationNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerApplicationNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerApplicationNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
