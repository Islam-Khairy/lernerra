import { NgClass } from '@angular/common';
import { Component, ElementRef, signal } from '@angular/core';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { StudentCoursesComponent } from '../student-courses/student-courses.component';
import { StudentTeachersSectionComponent } from "../student-teachers-section/student-teachers-section.component";
import { StudentReviewsSectionComponent } from '../student-reviews-section/student-reviews-section.component';
@Component({
  selector: 'app-student-profile-sections',
  imports: [
    NgClass,
    UpdateProfileComponent,
    StudentCoursesComponent,
    StudentTeachersSectionComponent,
    StudentReviewsSectionComponent
],
  templateUrl: './student-profile-sections.component.html',
  styleUrl: './student-profile-sections.component.css',
})
export class StudentProfileSectionsComponent {

  profileSections = [
    'Profile',
    'My Courses',
    'Teachers',
    'My Reviews',
  ];
  selectedSection = 0;

  selectSection(index: number) {
    this.selectedSection = index;
  }
}
