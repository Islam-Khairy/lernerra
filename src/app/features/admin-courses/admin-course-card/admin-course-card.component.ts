import { Component, Input } from '@angular/core';
import { ICourse } from '../../../interfaces/course/icourse';
import { FormsModule } from '@angular/forms';
import { AdminCoursesComponent } from './../admin-courses.component';
import { CourseService } from '../../../services/course/course-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-course-card',
  imports: [FormsModule],
  templateUrl: './admin-course-card.component.html',
  styleUrl: './admin-course-card.component.css',
})
export class AdminCourseCardComponent {
  @Input() course!: ICourse;
  @Input() status!: string;
  showConfirm = false;
  note: string = '';
  constructor(
    private courseService: CourseService,
    private toastr: ToastrService,
    private admin: AdminCoursesComponent
  ) {}

  updateCourseStatus(courseId: number, status: string) {
    this.courseService
      .updateCourseStatus(courseId, parseInt(status, 0), this.note)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success('Course updated successfully', 'Success', {
            progressBar: true,
            progressAnimation: 'increasing',
            closeButton: true,
          });
          this.admin.getCoursesByStatus();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.error.message, 'Error', {
            progressBar: true,
            progressAnimation: 'decreasing',
            closeButton: true,
          });
        },
      });
  }

  deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe({
      next: (res) => {
        console.log(res);
        this.admin.getCoursesByStatus();
      },
      error: (err) => {
        console.log(err);
        this.admin.getCoursesByStatus();
      },
    });
  }

  openConfirm() {
    this.showConfirm = true;
  }

  confirmAction(courseId: number) {
    this.showConfirm = false;
    this.deleteCourse(courseId);
  }

  cancelAction() {
    this.showConfirm = false;
    console.log('User clicked No');
  }
}
