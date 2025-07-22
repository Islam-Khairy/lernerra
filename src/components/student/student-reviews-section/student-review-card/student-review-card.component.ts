import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student-review-card',
  imports: [CommonModule],
  templateUrl: './student-review-card.component.html',
  styleUrl: './student-review-card.component.css',
})
export class StudentReviewCardComponent {
  @Input() studentReview: any;

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return [
      ...Array(fullStars).fill('full'),
      ...(halfStar ? ['half'] : []),
      ...Array(emptyStars).fill('empty'),
    ];
  }
}
