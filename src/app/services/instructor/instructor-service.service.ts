import {  Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICourse } from '../../interfaces/course/icourse';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  constructor(private _http:HttpClient){}

  getInstructorById(instructorId:string):Observable<any>{
    return this._http.get(`${environment.apiUrl}/User/${instructorId}`);
  }
  
  getInstructorCourses(instructorId?:string):Observable<any>{
    return this._http.get(`${environment.apiUrl}/Course/instructor`);    
  }

  getInstructorCoursesById(instructorId:string):Observable<any>{
    return this._http.get(`${environment.apiUrl}/Course/instructor/${instructorId}`);    
  }

   updateCourse(courseId:any,course:ICourse):Observable<any>{
    return this._http.put(`${environment.apiUrl}/Course/${courseId}`,course,{responseType:"text"},)
  }

  updateInstructor(data:any):Observable<any>{
    return this._http.put(`${environment.apiUrl}/User/update`,data)
  }

  getAllInstructors():Observable<any>{
    return this._http.get(`${environment.apiUrl}/User/role/instructor`);
  }
}