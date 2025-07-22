import { Component, Input } from '@angular/core'; // Correct import

@Component({
  selector: 'app-student-section-header',
  imports: [],
  templateUrl: './student-section-header.component.html',
  styleUrl: './student-section-header.component.css',
})
export class StudentSectionHeaderComponent {
  @Input() title: string = ''; // Corrected decorator and added type
  @Input() count: number = 0; // Corrected decorator and added type
}
