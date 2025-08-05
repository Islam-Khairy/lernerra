import { Component, signal, WritableSignal } from '@angular/core';
import { AdminCourseCardComponent } from "./admin-course-card/admin-course-card.component";
import { ICourse } from './../../interfaces/course/icourse';
import { CourseService } from '../../services/course/course-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-courses',
  imports: [AdminCourseCardComponent],
  templateUrl: './admin-courses.component.html',
  styleUrl: './admin-courses.component.css'
})
export class AdminCoursesComponent {
  courses!: ICourse[];
  courseStatus: WritableSignal<string> =signal("0");

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.getCoursesByStatus();
  }


  onRadioChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.courseStatus.set(inputElement.value) ;
    console.log('Selected radio value:', this.courseStatus());
    this.getCoursesByStatus();
  }

  getCoursesByStatus() {
    this.courseService.getCoursesbystatus(parseInt(this.courseStatus(), 0)).subscribe({
      next: (res) => {
        console.log(res);
        this.courses = res;
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  

}
