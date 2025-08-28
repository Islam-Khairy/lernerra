import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentReviewsSectionComponent } from './student-reviews-section.component';

describe('StudentReviewsSectionComponent', () => {
  let component: StudentReviewsSectionComponent;
  let fixture: ComponentFixture<StudentReviewsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentReviewsSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentReviewsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
