import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-shopping-cart-course-card',
  imports: [CommonModule, RatingModule, FormsModule],
  templateUrl: './shopping-cart-course-card.component.html',
  styleUrl: './shopping-cart-course-card.component.css',
})
export class ShoppingCartCourseCardComponent {
  @Input() course: any;
}