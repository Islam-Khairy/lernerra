import { Component } from '@angular/core';
import { CourseCardComponent } from './course-card/course-card.component';
import { StudentSectionHeaderComponent } from '../student-profile-sections/student-section-header/student-section-header.component';
import { CourseService } from '../../../app/services/course/course-service.service';
import { ICourse } from '../../../app/interfaces/course/icourse';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-courses',
  imports: [CourseCardComponent, StudentSectionHeaderComponent,RouterLink],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css',
})
export class StudentCoursesComponent {
  StudentCourses!:ICourse[]

ngOnInit(): void {
 this.getStudentCourses();
  
}
  constructor(private courseService:CourseService) {
  }
  getStudentCourses(){
    this.courseService.getStudentCourses().subscribe({
      next:(res: any)=>{
        console.log(res);
        this.StudentCourses=res
      },
      error:(err: any)=>{
        console.log(err);
      }
    })
  }
}
