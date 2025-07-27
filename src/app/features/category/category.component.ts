import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Button } from "primeng/button";
import {  Menu } from 'primeng/menu';
import { CourseCardComponent } from "../../Shared/course-card/course-card.component";
import { Course } from '../../Shared/Models/Course';
import { instructor } from '../../Shared/Models/instructor';
import { MentorCardComponent } from '../../Shared/mentor-card/mentor-card.component';
@Component({
  selector: 'app-category',
  imports: [Button, Menu, CourseCardComponent,MentorCardComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  sortOptions:MenuItem[]
   constructor() {
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
  courses: Course[] = [
  {
    id: 1,
    name: "Beginner’s Guide to UX Design",
    image: "images/courseImage.png",
    description: "22 Hours, 155 Lectures",
    rate: 1200,
    duration: 22,
    price: 149.9,
    instructorName: "Ronald Richards",
    categoryName: "UX Design",
    status: "Beginner"
  },
  {
    id: 2,
    name: "Mastering Web Development",
    image: "images/courseImage.png",
    description: "18 Hours, 120 Lectures",
    rate: 980,
    duration: 18,
    price: 129.9,
    instructorName: "Leslie Alexander",
    categoryName: "Web Development",
    status: "Intermediate"
  },
  {
    id: 3,
    name: "UI Design Bootcamp",
    image: "images/courseImage.png",
    description: "20 Hours, 140 Lectures",
    rate: 875,
    duration: 20,
    price: 139.9,
    instructorName: "Jenny Wilson",
    categoryName: "UI Design",
    status: "Beginner"
  },
  {
    id: 4,
    name: "Fullstack JavaScript Course",
    image: "images/courseImage.png",
    description: "25 Hours, 200 Lectures",
    rate: 1100,
    duration: 25,
    price: 159.9,
    instructorName: "Cody Fisher",
    categoryName: "Fullstack",
    status: "Advanced"
  },
  {
    id: 5,
    name: "Creative Graphic Design",
    image: "images/courseImage.png",
    description: "15 Hours, 100 Lectures",
    rate: 760,
    duration: 15,
    price: 119.9,
    instructorName: "Theresa Webb",
    categoryName: "Graphic Design",
    status: "Beginner"
  },
  {
    id: 6,
    name: "React for Professionals",
    image: "images/courseImage.png",
    description: "30 Hours, 180 Lectures",
    rate: 1320,
    duration: 30,
    price: 179.9,
    instructorName: "Guy Hawkins",
    categoryName: "Web Development",
    status: "Advanced"
  }
];
   sortCourses(criteria: string) {
    console.log('Sorting by:', criteria);
   
  }


   instructors:instructor[]=[
    {
     name:'Ronald Richards',
     title:'Web Developer',
     rating:4.9,
     studentsNum:2700,
     image:'images/student/student.png'
    },
    {
     name:'Ronald Richards',
     title:'Web Developer',
     rating:4.9,
     studentsNum:2700,
     image:'images/student/student.png'
    },
    {
     name:'Ronald Richards',
     title:'Web Developer',
     rating:4.9,
     studentsNum:2700,
     image:'images/student/student.png'
    },
    {
    name:'Ronald Richards',
     title:'Web Developer',
     rating:4.9,
     studentsNum:2700,
     image:'images/student/student.png'
    },
    {
    name:'Ronald Richards',
     title:'Web Developer',
     rating:4.9,
     studentsNum:2700,
     image:'images/student/student.png'
    }
  ]
}
