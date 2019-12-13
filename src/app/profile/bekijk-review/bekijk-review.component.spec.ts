import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BekijkReviewComponent } from './bekijk-review.component';

describe('BekijkReviewComponent', () => {
  let component: BekijkReviewComponent;
  let fixture: ComponentFixture<BekijkReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BekijkReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BekijkReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
