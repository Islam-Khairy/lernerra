import { Component } from '@angular/core';
import { StudentReviewCardComponent } from './student-review-card/student-review-card.component';

@Component({
  selector: 'app-student-reviews-section',
  imports: [StudentReviewCardComponent],
  templateUrl: './student-reviews-section.component.html',
  styleUrl: './student-reviews-section.component.css',
})
export class StudentReviewsSectionComponent {
  studentReviews = [
    {
      courseName: 'Beginner’s Guide to Design',
      rating: 5,
      review:
        'I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.',
    },
    {
      courseName: 'Beginner’s Guide to Design',
      rating: 4.5,
      review:
        'I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.',
    },
    {
      courseName: 'Beginner’s Guide to Design',
      rating: 4.5,
      review:
        'I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.',
    },
  ];
}
