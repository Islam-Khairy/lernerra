import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Button } from "primeng/button";
import {  Menu } from 'primeng/menu';
import { CourseCardComponent } from "../../Shared/course-card/course-card.component";
import { MentorCardComponent } from '../../Shared/mentor-card/mentor-card.component';
import { ICourse } from '../../interfaces/course/icourse';
import { CourseService } from '../../services/course/course-service.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category',
  imports: [Button, Menu, CourseCardComponent,MentorCardComponent,RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  sortOptions:MenuItem[]
  categoryId!:number;
  categoryName!:string
  courses!:ICourse[];
  topCourses!:ICourse[];

   constructor(private courseService:CourseService,private route :ActivatedRoute) {
    this.sortOptions = [
      {
        label: 'Most Relevant',
        icon: 'pi pi-sort-amount-down',
        command: () => {
          this.sortCourses('relevance');
        }
      },
      {
        label: 'Top Rated',
        icon: 'pi pi-star',
        command: () => {
          this.sortCourses('rating');
        }
      },
      {
        label: 'Newest',
        icon: 'pi pi-clock',
        command: () => {
          this.sortCourses('newest');
        }
      },
      {
        label: 'Price: Low to High',
        icon: 'pi pi-sort-amount-up-alt',
        command: () => {
          this.sortCourses('priceAsc');
        }
      },
      {
        label: 'Price: High to Low',
        icon: 'pi pi-sort-amount-down-alt',
        command: () => {
          this.sortCourses('priceDesc');
        }
      }
    ];
  }
  
   sortCourses(criteria: string) {
    console.log('Sorting by:', criteria);
   
  }

  ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
       this.categoryId = parseInt(params.get('id')|| "0");
     });
    this.getCategoryCourses();
    this.getTopCourses()

   
  }

  getCategoryCourses(){
    this.courseService.getCategoryCourses(this.categoryId).subscribe({
      next:(res)=>{
        console.log(res);
        this.courses=res.courses;
        this.categoryName=res.name;
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }

  getTopCourses(){
    this.courseService.getAllCourses().subscribe({
      next:(res)=>{
        console.log(res);
        this.topCourses=res.sort((a:ICourse, b:ICourse) => b.rate - a.rate);;
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
}
