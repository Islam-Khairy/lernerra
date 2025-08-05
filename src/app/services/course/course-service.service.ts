import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private _http:HttpClient) {    
  }

  getStudentCourses(studentId:string):Observable<any>{
    return this._http.get(`http://localhost:5138/api/Course/student/${studentId}` );
  }

  getCourseById(courseId:number):Observable<any>{
    return this._http.get(`http://localhost:5138/api/Course/${courseId}` );
  }

  getCategoryCourses(categoryId:number):Observable<any>{
    return this._http.get(`http://localhost:5138/api/Category/${categoryId}/courses`);
  }

  getAllCourses():Observable<any>{
    return this._http.get(`http://localhost:5138/api/Course/approved`);
  }

  getCoursesbystatus(courseStatus:number):Observable<any>{
    return this._http.get(`http://localhost:5138/api/Course/Status?courseStatus=${courseStatus}`)
  }
  
  updateCourseStatus(courseId:number,status:number):Observable<any>{
    return this._http.put(`http://localhost:5138/api/Course/status`,{
      "courseId":courseId, 
  "status":status
    })
  }

  deleteCourse(courseId:number):Observable<any>{
    return this._http.delete(`http://localhost:5138/api/Course/${courseId}`);
  }
}
