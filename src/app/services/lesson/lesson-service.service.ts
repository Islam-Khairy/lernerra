import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILesson } from '../../interfaces/lesson/ilesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  constructor(private _http:HttpClient){}
  token:string="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNzE3NGMzNy05ZWFmLTRiODgtYTYzOC1hYjU5ZDMwMGIyN2MiLCJzdWIiOiJzaGVyaWZhbGk0NTBAZ21haWwuY29tIiwiZW1haWwiOiJzaGVyaWZhbGk0NTBAZ21haWwuY29tIiwidWlkIjoiZGFhNGE5NzMtMWZjMS00OWNjLWJiMjUtM2YyYTViOWI4ODhhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkFkbWluIiwiSW5zdHJ1Y3RvciIsIlN0dWRlbnQiXSwiZXhwIjoxNzU0ODMzMDQxLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3Mjc0IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDIwMCJ9.jBAc9kd_Z-fhhbuRkxAWSMQonKpUSVjFli6R4NA_zOA"

  uploadLesson(lesson:any):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', this.token);
    return this._http.post(`http://localhost:5138/api/Lesson`,lesson,{headers,responseType:'text'});
  }

  getLessons(courseId:number):Observable<any>{
    return this._http.get(`http://localhost:5138/api/Lesson/course/${courseId}`);
  }

  updateLesson(lessonId:number,lesson:any):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', this.token);
    return this._http.put(`http://localhost:5138/api/Lesson/${lessonId}`,lesson,{headers,responseType:'text'});
  }

  deleteLesson(lessonId:number):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', this.token);
    return this._http.delete(`http://localhost:5138/api/Lesson/${lessonId}`,{headers,responseType:'text'});
  }
  
}
