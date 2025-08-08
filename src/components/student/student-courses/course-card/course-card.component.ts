import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RatingModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent {
  @Input() course!: any;
  @Input() role?:string;
}
