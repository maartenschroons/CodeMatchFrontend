import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerCompletedComponent } from './maker-completed.component';

describe('MakerCompletedComponent', () => {
  let component: MakerCompletedComponent;
  let fixture: ComponentFixture<MakerCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
