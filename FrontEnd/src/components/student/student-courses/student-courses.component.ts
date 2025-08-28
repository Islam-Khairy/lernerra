import { Component, inject } from '@angular/core';
import { CourseCardComponent } from './course-card/course-card.component';
import { StudentSectionHeaderComponent } from '../student-profile-sections/student-section-header/student-section-header.component';
import { CourseService } from '../../../app/services/course/course-service.service';
import { ICourse } from '../../../app/interfaces/course/icourse';
import { AccountService } from '../../../app/core/services/account.service';
import { RouterLink } from '@angular/router';
import { EnrollmentService } from '../../../app/core/services/enrollmentService/enrollment.service';
import { FilterPipe } from '../../../app/core/pipes/filter-pipe.pipe';

@Component({
  selector: 'app-student-courses',
  imports: [CourseCardComponent, StudentSectionHeaderComponent,RouterLink,FilterPipe],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css',
})
export class StudentCoursesComponent {
  enrollementService=inject(EnrollmentService)
  searchInput: string = '';
  // StudentCourses:EnrolledCourse[]=[];
  courses:any;

  // getStudentCourses()
  // {

  //   this.enrollmentService.getStudentEnrolledCourses().subscribe(
  //     {
  //       next:(res)=>{
  //         console.log("response from enrolled",res);
  //         this.StudentCourses=res;
  //         // console.log(res)
  //         // this.courses=res;
  //       },
  //       error:(err)=>{err.error.message}
  //     }
  //   )
  // }




studentId!:string;
StudentCourses: ICourse[] = [];

ngOnInit(): void {
 this.getStudentCourses()
  
}
  constructor(private courseService:CourseService,private accountService:AccountService) {
    this.studentId=accountService.user()?.userId || "";
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