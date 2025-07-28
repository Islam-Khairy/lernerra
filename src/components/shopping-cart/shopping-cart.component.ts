import { Component } from '@angular/core';
import { ShoppingCartCourseCardComponent } from './shopping-cart-course-card/shopping-cart-course-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  imports: [ShoppingCartCourseCardComponent, RouterLink],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent {
  shoppingCartCourses = [
    {
      id: 1,
      name: 'Introduction to User Experience Design',
      instructor: 'John Doe',
      rate: '4.6',
      numberOfRatings: 250,
      image: '/images/shopping-card-course.svg',
      price: '45.00',
      duration: '22',
      Lectures: '155',
      level: 'Beginner',
    },
    {
      id: 2,
      name: 'Introduction to User Experience Design',
      instructor: 'John Doe',
      rate: '4.6',
      numberOfRatings: 250,
      image: '/images/shopping-card-course.svg',
      price: '45.00',
      duration: '22',
      Lectures: '155',
      level: 'Beginner',
    },
    {
      id: 3,
      name: 'Introduction to User Experience Design',
      instructor: 'John Doe',
      rate: '4.6',
      numberOfRatings: 250,
      image: '/images/shopping-card-course.svg',
      price: '45.00',
      duration: '22',
      Lectures: '155',
      level: 'Beginner',
    },

  ];
}
