import { Component, input, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CoursePrograssService } from '../../../../app/Core/Services/courseService/course-prograss.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { ButtonModule, Button } from 'primeng/button';
import { ICourse } from '../../../../app/interfaces/course/icourse';
import { AccountService } from '../../../../app/Core/Services/account.service';
@Component({
  selector: 'app-course-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RatingModule,
    FormsModule,
    Dialog,
    Button,
  ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent {
  constructor(
    private progressService: CoursePrograssService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService
  ) {
    this.userRoles.set(this.accountService.user()?.roles || []);
  }
  course = input<ICourse>();
  userRoles = signal<string[]>([]);
  @Input() role: string = 'student';
  progress = 0;
  courseId = signal<number>(0);
  visible: boolean = false;
  lessonProgressList: any;
  courseRate = this.course()?.rate || 0;
  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return [
      ...Array(fullStars).fill('full'),
      ...(halfStar ? ['half'] : []),
      ...Array(emptyStars).fill('empty'),
    ];
  }

  ngOnInit() {
    console.log('course', this.course()); // لو محتاجها للدبجنج
    this.courseId.set(this.course()?.id || 0);

    this.getCourseProgress();
  }
  showDialog() {
    this.visible = true;
  }

  getCourseProgress() {
    console.log(this.courseId());
    this.progressService.getCoursePrograss(this.courseId()).subscribe({
      next: (res) => {
        console.log(res);
        this.progress = Math.round(res.progressPercentage);
        console.log(this.progress);
      },
    });
  }
}
