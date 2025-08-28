import { Component, effect, inject, signal } from '@angular/core';
import { CourseCardComponent } from '../../app/Shared/course-card/course-card.component';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../app/core/services/category.service';
import { Category } from '../../app/Shared/Models/category';
import { ICourse } from './../../app/interfaces/course/icourse';
import { CourseService } from '../../app/services/course/course-service.service';
import { IInstructor } from '../../app/interfaces/instructor/iinstructor';
import { InstructorService } from '../../app/services/instructor/instructor-service.service';

@Component({
  selector: 'app-home-page',
  imports: [
CourseCardComponent,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  categoryService=inject(CategoryService)
  courseService=inject(CourseService)
  instructorService=inject(InstructorService)
  topCategories=signal<Category[]|null>(null)
  constructor(){
    effect(()=>{
      this.categoryService.getCategories().subscribe({
        next:(res:Category[])=>{
          this.topCategories.set(res)
        }
      })
    })
  }
  topCourses! : ICourse[]

  topInstructors! :IInstructor[];


ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getTopCourses();
}
  getTopCourses(){
    this.courseService.getAllCourses().subscribe({
      next: (res: ICourse[]) => {
      this.topCourses=res.sort((a:ICourse, b:ICourse) => b.rate - a.rate).slice(0, 4);
        console.log('Top Courses:', this.topCourses);
      },
      error: (err: any) => {
        console.error('Error fetching top courses:', err);
      }
    })
  }

}