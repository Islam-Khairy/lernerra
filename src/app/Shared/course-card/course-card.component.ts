import { Component, input} from '@angular/core';
import { Course } from '../Models/Course';
import { Button } from "primeng/button";
import { Rating } from "primeng/rating";
import { FormsModule } from '@angular/forms';
import { ICourse } from '../../interfaces/course/icourse';

@Component({
  selector: 'app-course-card',
  imports: [Button, Rating,FormsModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  rating=5
 course=input<ICourse>()
}
