import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerOngoingComponent } from './maker-ongoing.component';

describe('MakerOngoingComponent', () => {
  let component: MakerOngoingComponent;
  let fixture: ComponentFixture<MakerOngoingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerOngoingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerOngoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
