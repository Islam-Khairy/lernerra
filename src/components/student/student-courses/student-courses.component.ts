import { Component } from '@angular/core';
import { CourseCardComponent } from './course-card/course-card.component';
import { StudentSectionHeaderComponent } from '../student-profile-sections/student-section-header/student-section-header.component';
import { CourseService } from '../../../app/services/course/course-service.service';
import { ICourse } from '../../../app/interfaces/course/icourse';
import { AccountService } from '../../../app/core/services/account.service';

@Component({
  selector: 'app-student-courses',
  imports: [CourseCardComponent, StudentSectionHeaderComponent],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css',
})
export class StudentCoursesComponent {
  studentId!:string;
  StudentCourses!:ICourse[]

ngOnInit(): void {
 this.getStudentCourses()
  
}
  constructor(private courseService:CourseService,private accountService:AccountService) {
    this.studentId=accountService.user()?.userId || "";
  }
  getStudentCourses(){
    this.courseService.getStudentCourses(this.studentId).subscribe({
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
