import { Component } from '@angular/core';
import { StudentTeacherCardComponent } from "./student-teacher-card/student-teacher-card.component";
import { StudentSectionHeaderComponent } from "../student-profile-sections/student-section-header/student-section-header.component";

@Component({
  selector: 'app-student-teachers-section',
  imports: [StudentTeacherCardComponent, StudentSectionHeaderComponent],
  templateUrl: './student-teachers-section.component.html',
  styleUrl: './student-teachers-section.component.css',
})
export class StudentTeachersSectionComponent {
  studentTeachers = [
    {
      id: 1,
      name: 'Ronald Richards',
      role: 'UI/UX Designer',
      image: '/images/teacher.svg',
    },
    {
      id: 2,
      name: 'Ronald Richards',
      role: 'UI/UX Designer',
      image: '/images/teacher.svg',
    },
    {
      id: 3,
      name: 'Ronald Richards',
      role: 'UI/UX Designer',
      image: '/images/teacher.svg',
    },
    {
      id: 4,
      name: 'Ronald Richards',
      role: 'UI/UX Designer',
      image: '/images/teacher.svg',
    },
       {
      id: 5,
      name: 'Ronald Richards',
      role: 'UI/UX Designer',
      image: '/images/teacher.svg',
    },
       {
      id: 6,
      name: 'Ronald Richards',
      role: 'UI/UX Designer',
      image: '/images/teacher.svg',
    },
  ];
  
}
