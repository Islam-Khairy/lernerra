import { Component, effect, inject, signal } from '@angular/core';
import { Category } from '../../app/Shared/Models/category';
import { CategoryService } from '../../app/core/services/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  categoryService=inject(CategoryService)
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
}
