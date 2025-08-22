import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms"; // Correct import

@Component({
  selector: 'app-student-section-header',
  imports: [FormsModule],
  templateUrl: './student-section-header.component.html',
  styleUrl: './student-section-header.component.css',
})
export class StudentSectionHeaderComponent {
  @Input() title: string = ''; // Corrected decorator and added type
  @Input() count: number = 0; // Corrected decorator and added type
  searchInput: string = ''; 
  @Output() search= new EventEmitter<string>();
  sendData() {
    this.search.emit(this.searchInput);
  }

}
