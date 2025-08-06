import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, inject } from '@angular/core';
import { CourseCardComponent } from '../../student/student-courses/course-card/course-card.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { RouterLink } from '@angular/router';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';

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
  courses = [
    {
      id: 1,
      name: 'Beginner’s Guide to Design',
      instructor: {
        fullName: 'Ronald Richards',
      },
      categoryName: 'Design',
      image: '/images/student/courseImage.png',
      rate: '4.5',
      numberOfRatings: 1200,
      duration: '22',
      Lectures: '155',
      level: 'Beginner',
      price: '149.9',
    },
    {
      id: 2,
      name: 'Beginner’s Guide to Design',
      instructor: {
        fullName: 'Ronald Richards',
      },
      categoryName: 'Design',
      image: '/images/student/courseImage.png',
      rate: '5',
      numberOfRatings: 1200,
      duration: '22',
      Lectures: '155',
      level: 'Beginner',
      price: '149.9',
    },
    {
      id: 3,
      name: 'Beginner’s Guide to Design',
      instructor: {
        fullName: 'Ronald Richards',
      },
      categoryName: 'Design',
      image: '/images/student/courseImage.png',
      rate: '4.5',
      numberOfRatings: 1200,
      duration: '22',
      Lectures: '155',
      level: 'Beginner',
      price: '149.9',
    },
    {
      id: 4,
      name: 'Beginner’s Guide to Design',
      instructor: {
        fullName: 'Ronald Richards',
      },
      categoryName: 'Design',
      image: '/images/student/courseImage.png',
      rate: '5',
      numberOfRatings: 1200,
      duration: '22',
      Lectures: '155',
      level: 'Beginner',
      price: '149.9',
    },
  ];

  selectedSection = 1;
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  selectSection(index: number) {
    this.selectedSection = index;
  }

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this course?',
      header: 'Delete Course',
      icon: 'pi pi-times-circle !text-red-500',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text p-button-secondary',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Course deleted successfully',
        });
      },
    });
  }
}
