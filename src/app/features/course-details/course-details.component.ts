import { Component, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {  RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { Divider } from "primeng/divider";
import { CourseService } from '../../services/course/course-service.service';
import { ICourse } from '../../interfaces/course/icourse';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-course-details',
  imports: [BreadcrumbModule, RatingModule, FormsModule, CardModule, Divider,RouterLink,CurrencyPipe],
templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
   items=signal<MenuItem[]|undefined>(undefined)
   stars!:number
   courseId:number =2;
   course!:ICourse
   fullduration:number=0
  constructor(private courseService:CourseService,private activatedRoute :ActivatedRoute){
    effect(()=>{
      this.items.set( [
      { label: 'Home', routerLink: '/home' },
      { label: 'Categories', routerLink: '/home/Categories' },
      { label: 'Introduction to User Experience Design' }
        ])
    })
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
       this.courseId = parseInt(params.get('id')|| "0");
     });
    this.getCourseDetails();
  }
  getCourseDetails(){
    this.courseService.getCourseById(this.courseId).subscribe({
      next:(res)=>{
        console.log(res);
        this.course=res
        this.durationCalc()
        this.stars=res.rate
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  durationCalc(){
    this.course.lessons?.forEach(l => {
    this.fullduration=l.duration+this.fullduration
   });
   console.log(this.fullduration);
  }

}
