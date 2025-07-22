import { Component } from '@angular/core';
import { CourseCardComponent } from '../student/student-courses/course-card/course-card.component';
import { MatCardModule } from '@angular/material/card';
import { WhatTheySayCarousalComponent } from './what-they-say-carousal/what-they-say-carousal.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home-page',
  imports: [CourseCardComponent, MatCardModule, WhatTheySayCarousalComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  topCategories = [
    {
      image: '/images/home/category1.svg',
      name: 'Astrology',
      numberOfCourses: 11,
    },
    {
      image: '/images/home/category2.svg',
      name: 'Development',
      numberOfCourses: 12,
    },
    {
      image: '/images/home/category3.svg',
      name: 'Marketing',
      numberOfCourses: 12,
    },
    {
      image: '/images/home/category4.svg',
      name: 'Physics',
      numberOfCourses: 12,
    },
  ];

  topCourses = [
    {
      id: 1,
      name: 'Beginner’s Guide to Design',
      instructor: 'Ronald Richards',
      image: '/images/student/courseImage.png',
      rate: '4.5',
      NumberOfRatings: 1200,
      duration: '22',
      Lectures: '155',
      level: 'Beginner',
      price: '149.9',
    },
    {
      id: 2,
      name: 'Beginner’s Guide to Design',
      instructor: 'Ronald Richards',
      image: '/images/student/courseImage.png',
      rate: '5',
      NumberOfRatings: 1200,
      duration: '22',
      Lectures: '155',
      level: 'Beginner',
      price: '149.9',
    },
    {
      id: 3,
      name: 'Beginner’s Guide to Design',
      instructor: 'Ronald Richards',
      image: '/images/student/courseImage.png',
      rate: '4.5',
      NumberOfRatings: 1200,
      duration: '22',
      Lectures: '155',
      level: 'Beginner',
      price: '149.9',
    },
    {
      id: 4,
      name: 'Beginner’s Guide to Design',
      instructor: 'Ronald Richards',
      image: '/images/student/courseImage.png',
      rate: '5',
      NumberOfRatings: 1200,
      duration: '22',
      Lectures: '155',
      level: 'Beginner',
      price: '149.9',
    },
  ];

  topInstructors = [
    {
      image: '/images/teacher.svg',
      name: 'Ronald Richards',
      role: 'UI/UX Designer',
      rate: '4.9',
      numberOfRatings: '2400',
    },
    {
      image: '/images/teacher.svg',
      name: 'Ronald Richards',
      role: 'UI/UX Designer',
      rate: '4.9',
      numberOfRatings: '2400',
    },
    {
      image: '/images/teacher.svg',
      name: 'Ronald Richards',
      role: 'UI/UX Designer',
      rate: '4.9',
      numberOfRatings: '2400',
    },
    {
      image: '/images/teacher.svg',
      name: 'Ronald Richards',
      role: 'UI/UX Designer',
      rate: '4.9',
      numberOfRatings: '2400',
    },
    {
      image: '/images/teacher.svg',
      name: 'Ronald Richards',
      role: 'UI/UX Designer',
      rate: '4.9',
      numberOfRatings: '2400',
    },
  ];

  reviews = [
    {
      name: 'Islam',
      role: 'Designer',
      image: '/images/home/reviewer.svg',
      content: `
      Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.`,
    },
    {
      name: 'Ahmed',
      role: 'Designer',
      image: '/images/home/reviewer.svg',
      content: `
      Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.`,
    },
    {
      name: 'Sherif',
      role: 'Designer',
      image: '/images/home/reviewer.svg',
      content: `
      Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.`,
    },
    {
      name: 'Mariem',
      role: 'Designer',
      image: '/images/home/reviewer.svg',
      content: `
      Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.`,
    },
    {
      name: 'Edris',
      role: 'Designer',
      image: '/images/home/reviewer.svg',
      content: `
      Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.`,
    },
  ];
}
