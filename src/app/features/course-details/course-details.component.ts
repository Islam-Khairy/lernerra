import { Component, effect, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {  RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { Divider } from "primeng/divider";
@Component({
  selector: 'app-course-details',
  imports: [BreadcrumbModule, RatingModule, FormsModule, CardModule, Divider],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
   items=signal<MenuItem[]|undefined>(undefined)
   stars:number=5
  constructor(){
    effect(()=>{
      this.items.set( [
      { label: 'Home', routerLink: '/home' },
      { label: 'Categories', routerLink: '/home/Categories' },
      { label: 'Introduction to User Experience Design' }
        ])
    })
  }

}
