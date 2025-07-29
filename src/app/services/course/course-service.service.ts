import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private _http:HttpClient) {    
  }

  getStudentCourses():Observable<any>{
    let token:any=localStorage.getItem("userToken")
    return this._http.get(`http://localhost:5138/api/Course/student/1`/*${id}*/ ,/*{
      headers:token
    }*/)
  }

  getCourseById(courseId:number):Observable<any>{
    return this._http.get(`http://localhost:5138/api/Course/${courseId}` )
  }
}
