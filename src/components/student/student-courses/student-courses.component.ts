import { Component } from '@angular/core';
import { CourseCardComponent } from './course-card/course-card.component';
import { StudentSectionHeaderComponent } from '../student-profile-sections/student-section-header/student-section-header.component';
import { CourseService } from '../../../app/services/course/course-service.service';
import { ICourse } from '../../../app/interfaces/course/icourse';

@Component({
  selector: 'app-student-courses',
  imports: [CourseCardComponent, StudentSectionHeaderComponent],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css',
})
export class StudentCoursesComponent {

  StudentCourses!:ICourse[]
  // studentCourses = [
  //   {
  //     id: 1,
  //     name: 'Beginner’s Guide to Design',
  //     instructor: 'Ronald Richards',
  //     image: '/images/student/courseImage.png',
  //     rate: '4.5',
  //     NumberOfRatings: 1200,
  //   },
  //   {
  //     id: 2,
  //     name: 'Beginner’s Guide to Design',
  //     instructor: 'Ronald Richards',
  //     image: '/images/student/courseImage.png',
  //     rate: '5',
  //     NumberOfRatings: 1200,
  //   },
  //   {
  //     id: 3,
  //     name: 'Beginner’s Guide to Design',
  //     instructor: 'Ronald Richards',
  //     image: '/images/student/courseImage.png',
  //     rate: '4.5',
  //     NumberOfRatings: 1200,
  //   },
  //   {
  //     id: 4,
  //     name: 'Beginner’s Guide to Design',
  //     instructor: 'Ronald Richards',
  //     image: '/images/student/courseImage.png',
  //     rate: '5',
  //     NumberOfRatings: 1200,
  //   },
  //   {
  //     id: 5,
  //     name: 'Beginner’s Guide to Design',
  //     instructor: 'Ronald Richards',
  //     image: '/images/student/courseImage.png',
  //     rate: '4.5',
  //     NumberOfRatings: 1200,
  //   },
  // ];
ngOnInit(): void {
 this.getStudentCourses()
  
}
  constructor(private courseService:CourseService) {
  }
  getStudentCourses(){
    this.courseService.getStudentCourses().subscribe({
      next:(res)=>{
        console.log(res);
        this.StudentCourses=res
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
