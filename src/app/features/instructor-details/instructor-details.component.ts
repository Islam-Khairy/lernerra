import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Button } from "primeng/button";
import { StudentReviewCardComponent } from "../../../components/student/student-reviews-section/student-review-card/student-review-card.component";
import { Rating } from "primeng/rating";
import { FormsModule } from '@angular/forms';
import { InstructorService } from './../../services/instructor/instructor-service.service';
import { IInstructor } from '../../interfaces/instructor/iinstructor';
import { ICourse } from '../../interfaces/course/icourse';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-instructor-details',
  imports: [CarouselModule, Button, StudentReviewCardComponent, Rating,FormsModule,RouterLink, NgClass],
templateUrl: './instructor-details.component.html',
  styleUrl: './instructor-details.component.css'
})
export class InstructorDetailsComponent {
  rating!:number
  instructorId:string="1";
  instructor!:IInstructor;
  instructorCourses!:ICourse[];
  constructor(private instructorService:InstructorService){}

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  ngOnInit(): void {
    this.getInstructorDetails();
    
  }

  getInstructorDetails(){
    this.instructorService.getInstructorById(this.instructorId).subscribe({
      next:(res)=>{
        console.log(res);
        this.instructor=res;
        this.getInstructorCourses();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getInstructorCourses(){
    this.instructorService.getInstructorCourses(this.instructorId).subscribe({
      next:(res)=>{
        console.log(res);
        this.instructorCourses=res;
        this.getDuration();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getDuration(){
    this.instructorCourses.forEach(c=>{
      let duration=0;
      c.lessons.forEach(l=>{
      duration=l.duration+duration;
    });c.duration=duration })
  }

  getNumVisible(): number {
  if (!this.instructorCourses) return 1;
  return this.instructorCourses.length <= 2 ? this.instructorCourses.length : 3;
}

}
