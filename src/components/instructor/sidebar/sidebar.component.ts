import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, effect, inject, signal } from '@angular/core';
import { CourseCardComponent } from '../../student/student-courses/course-card/course-card.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { RouterLink } from '@angular/router';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { InstructorService } from '../../../app/services/instructor/instructor-service.service';
import { CourseService } from '../../../app/services/course/course-service.service';
import { ICourse } from '../../../app/interfaces/course/icourse';
import { UserService } from '../../../app/services/admin/user-service.service';
import { AccountService } from '../../../app/Core/Services/account.service';
import { UserInfo } from '../../../app/Shared/Models/User';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CourseCardComponent,
    ConfirmDialogModule,
    ToastModule,
    RouterLink,
    InstructorProfileComponent,
  ],
  providers: [ConfirmationService, MessageService, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  accountService = inject(AccountService);
  constructor(
    private instructorService: InstructorService,
    private courseService: CourseService
  ) {}
  courses!: ICourse[];

  selectedSection = 0;
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.getInstructorCourses();
  }

  selectSection(index: number) {
    this.selectedSection = index;
  }

  confirmDelete(event: Event, courseId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this course?',
      header: 'Delete Course',
      icon: 'pi pi-times-circle !text-red-500',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text p-button-secondary',
      accept: () => {
        this.deleteCourse(courseId);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Course deleted successfully',
        });
      },
    });
  }

  getInstructorCourses() {
    this.instructorService.getInstructorCourses().subscribe({
      next: (res) => {
        console.log(res);
        this.courses = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe({
      next: (res) => {
        console.log(res);
        this.getInstructorCourses();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
