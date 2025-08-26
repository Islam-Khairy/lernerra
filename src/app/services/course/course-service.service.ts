import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private _http:HttpClient) {    
  }

  getStudentCourses():Observable<any>{
    return this._http.get(`${environment.apiUrl}/Course/student` );
  }

  getCourseById(courseId:number):Observable<any>{
    return this._http.get(`${environment.apiUrl}/Course/${courseId}` );
  }

  getCategoryCourses(categoryId:number):Observable<any>{
    return this._http.get(`${environment.apiUrl}/Category/${categoryId}/courses`);
  }

  getAllCourses():Observable<any>{
    return this._http.get(`${environment.apiUrl}/Course/approved`);
  }

  getCoursesbystatus(courseStatus:number):Observable<any>{
    return this._http.get(`${environment.apiUrl}/Course/Status?courseStatus=${courseStatus}`)
  }
  
  updateCourseStatus(courseId:number,status:number,note:string):Observable<any>{
    return this._http.put(`${environment.apiUrl}/Course/status`,{
      "courseId":courseId, 
  "status":status,
  "notes":note
    },{responseType:'text'});
  }

  deleteCourse(courseId:number):Observable<any>{
    return this._http.delete(`${environment.apiUrl}/Course/${courseId}`,{responseType:'text'});
  }

  createCourse(course:any):Observable<any>{
    return this._http.post(`${environment.apiUrl}/Course/Upload`,course,{
    responseType: 'text'
    })
  }

  getSpecificCourse(courseId:number):Observable<any>
  {
    return this._http.get(`${environment.apiUrl}/Course/${courseId}`)
  }

  addRating(CourseId:number,Rating:number):Observable<any>{
    return this._http.post(`${environment.apiUrl}/Course/rate`,{courseId:CourseId,rating:Rating},{responseType:'text'})
  }

}