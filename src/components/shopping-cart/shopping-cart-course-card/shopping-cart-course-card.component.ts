import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-course-card',
  imports: [CommonModule],
  templateUrl: './shopping-cart-course-card.component.html',
  styleUrl: './shopping-cart-course-card.component.css'
})
export class ShoppingCartCourseCardComponent {
@Input() course: any

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return [
      ...Array(fullStars).fill('full'),
      ...(halfStar ? ['half'] : []),
      ...Array(emptyStars).fill('empty'),
    ];
  }
}
