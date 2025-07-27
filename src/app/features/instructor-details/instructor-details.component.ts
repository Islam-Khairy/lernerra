import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Button } from "primeng/button";
import { StudentReviewCardComponent } from "../../../components/student/student-reviews-section/student-review-card/student-review-card.component";
import { Rating } from "primeng/rating";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-instructor-details',
  imports: [CarouselModule, Button, StudentReviewCardComponent, Rating,FormsModule],
  templateUrl: './instructor-details.component.html',
  styleUrl: './instructor-details.component.css'
})
export class InstructorDetailsComponent {
  rating=5
   courses = [
    {
      title: "Beginner’s Guide to UX Design",
      author: "Ronald Richards",
      rating: 1200,
      duration: "22 Hours, 155 Lectures · Beginner",
      price: 149.9,
      image: "images/courseImage.png"
    },
    {
      title: "Mastering Web Development",
      author: "Leslie Alexander",
      rating: 980,
      duration: "18 Hours, 120 Lectures · Intermediate",
      price: 129.9,
      image: "images/courseImage.png"
    },
    {
      title: "UI Design Bootcamp",
      author: "Jenny Wilson",
      rating: 875,
      duration: "20 Hours, 140 Lectures · Beginner",
      price: 139.9,
      image: "images/courseImage.png"
    },
    {
      title: "Fullstack JavaScript Course",
      author: "Cody Fisher",
      rating: 1100,
      duration: "25 Hours, 200 Lectures · Advanced",
      price: 159.9,
      image: "images/courseImage.png"
    },
    {
      title: "Creative Graphic Design",
      author: "Theresa Webb",
      rating: 760,
      duration: "15 Hours, 100 Lectures · Beginner",
      price: 119.9,
      image: "images/courseImage.png"
    },
    {
      title: "React for Professionals",
      author: "Guy Hawkins",
      rating: 1320,
      duration: "30 Hours, 180 Lectures · Advanced",
      price: 179.9,
      image: "images/courseImage.png"
    }
  ];

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
}
