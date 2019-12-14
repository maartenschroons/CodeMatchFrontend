import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerRegisterComponent } from './maker-register.component';

describe('MakerRegisterComponent', () => {
  let component: MakerRegisterComponent;
  let fixture: ComponentFixture<MakerRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
