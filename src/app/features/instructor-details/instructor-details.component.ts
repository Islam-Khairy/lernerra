import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Button } from 'primeng/button';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InstructorService } from './../../services/instructor/instructor-service.service';
import { IInstructor } from '../../interfaces/instructor/iinstructor';
import { ICourse } from '../../interfaces/course/icourse';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-instructor-details',
  imports: [CarouselModule, Button, Rating, FormsModule, RouterLink],
  templateUrl: './instructor-details.component.html',
  styleUrl: './instructor-details.component.css',
})
export class InstructorDetailsComponent {
  rating!: number;
  instructorId!: string;
  instructor!: IInstructor;
  instructorCourses!: ICourse[];
  constructor(
    private instructorService: InstructorService,
    private route: ActivatedRoute
  ) {}

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.instructorId = params.get('id') || '0';
    });

    this.getInstructorDetails();
  }

  getInstructorDetails() {
    this.instructorService.getInstructorById(this.instructorId).subscribe({
      next: (res) => {
        console.log(res);
        this.instructor = res;
        this.getInstructorCourses();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getInstructorCourses() {
    this.instructorService
      .getInstructorCoursesById(this.instructor.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.instructorCourses = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getNumVisible(): number {
    if (!this.instructorCourses) return 1;
    return this.instructorCourses.length <= 2
      ? this.instructorCourses.length
      : 3;
  }
}
