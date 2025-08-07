import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  constructor(private _http:HttpClient){}
  
  getInstructorById(instructorId:string):Observable<any>{
    return this._http.get(`http://localhost:5138/api/User/${instructorId}`);
  }

  getInstructorCourses(instructorId:string):Observable<any>{
  return this._http.get(`http://localhost:5138/api/Course/instructor/${instructorId}`);    
  }

  updateInstructor(data:any){
    return this._http.put(`http://localhost:5138/api/User/update`,data)
  }
}
