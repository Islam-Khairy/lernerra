import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-student-review-card',
  imports: [CommonModule, RatingModule, FormsModule],
  templateUrl: './student-review-card.component.html',
  styleUrl: './student-review-card.component.css',
})
export class StudentReviewCardComponent {
  @Input() studentReview: any;
}
