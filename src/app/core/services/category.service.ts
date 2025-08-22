import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../../Shared/Models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = 'http://lernerra.runasp.net/api';
  http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + '/Category');
  }
}
