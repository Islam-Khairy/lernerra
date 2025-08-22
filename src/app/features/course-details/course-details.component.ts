import { Component, effect, Input, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { Divider } from 'primeng/divider';
import { EnrollmentService } from '../../Core/Services/enrollmentService/enrollment.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CourseService } from '../../services/course/course-service.service';
import { ICourse } from '../../interfaces/course/icourse';
// import { CourseService } from '../../services/course/course-service.service';
// import { ICourse } from '../../interfaces/course/icourse';

@Component({
  selector: 'app-course-details',
  imports: [
    BreadcrumbModule,
    RatingModule,
    FormsModule,
    CardModule,
    Divider,
    ToastModule,
    RouterLink,
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
  providers: [MessageService],
})
export class CourseDetailsComponent {
  course!: ICourse;
  courseInfo: any;
  enrollmentData: any;
  isenrolled: boolean = false;
  items = signal<MenuItem[] | undefined>(undefined);
  stars: number = 5;
  courseId: number = 0;
  //  stars!:number
  fullduration: number = 0;
  constructor(
    private courseService: CourseService,
    private enrollService: EnrollmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
    // constructor(private courseService:CourseService,private activatedRoute :ActivatedRoute){
    effect(() => {
      this.items.set([
        { label: 'Home', routerLink: '/home' },
        { label: 'Categories', routerLink: '/home/Categories' },
        { label: 'Introduction to User Experience Design' },
      ]);
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.courseId = parseInt(params.get('id') || '0');
    });
    console.log('get course');
    this.getCourseDetails();
  }
  getCourseDetails() {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (res) => {
        console.log('res', res);
        console.log(res);

        this.course = res.data;
        this.isenrolled = res.isEnrolled;
        console.log('cours', this.course);

        console.log(this.course.name);
        console.log(this.course.lessons.length);
        console.log(this.course.description);
        console.log(this.course.instructor.fullName);

        this.durationCalc();
        this.stars = res.rate;
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  durationCalc() {
    this.course.lessons?.forEach((l) => {
      this.fullduration = l.duration + this.fullduration;
    });
    console.log(this.fullduration);
  }

  showSuccess(message: string) {
    this.messageService.add({
      key: 'custom',
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }
  enrollFreeCourse(courseID: number) {
    this.enrollmentData = { courseId: courseID };
    console.log('enroll course =>', this.enrollmentData);

    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/log-in']);
      return;
    }

    this.enrollService.enrollFreeCourse(this.enrollmentData).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.showSuccess(res.message);
        }, 3000);
        this.router.navigate(['/student/student-courses']);
        console.log('success response', res);
      },
      error: (err) => {
        console.log('error', err.error);
      },
    });
  }
}
// ngOnInit() {
//   this.activatedRoute.paramMap.subscribe((params) => {
//     this.courseId = parseInt(params.get('id') || '0');
//   });

//   this.getCourse();
// }

// getCourse() {
//   console.log('in course');
//   this.courseService.getSpecificCourse(this.courseId).subscribe({
//     next: (res) => {
//       this.course = res.data;
//       this.isenrolled = res.isEnrolled;
//       console.log(res);
//       console.log(this.courseInfo);
//     },
//     error: (err) => {
//       console.log(err.error.message);
//     },
//   });
//   console.log('after course');
