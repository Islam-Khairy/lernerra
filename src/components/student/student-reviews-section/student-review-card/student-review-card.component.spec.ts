import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentReviewCardComponent } from './student-review-card.component';

describe('StudentReviewCardComponent', () => {
  let component: StudentReviewCardComponent;
  let fixture: ComponentFixture<StudentReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentReviewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
