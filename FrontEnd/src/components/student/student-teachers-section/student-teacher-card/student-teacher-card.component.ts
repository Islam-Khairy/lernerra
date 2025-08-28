import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-student-teacher-card',
  imports: [MatCardModule],
  templateUrl: './student-teacher-card.component.html',
  styleUrl: './student-teacher-card.component.css',
})
export class StudentTeacherCardComponent {
  @Input() teacher: any;
}
