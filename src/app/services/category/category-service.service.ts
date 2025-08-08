import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private _http:HttpClient){}

  getCategories():Observable<any>{
    return this._http.get(`http://localhost:5138/api/Category`);
  }

}
