import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICourse } from '../../interfaces/course/icourse';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  constructor(private _http: HttpClient) {}
  token: string =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNzE3NGMzNy05ZWFmLTRiODgtYTYzOC1hYjU5ZDMwMGIyN2MiLCJzdWIiOiJzaGVyaWZhbGk0NTBAZ21haWwuY29tIiwiZW1haWwiOiJzaGVyaWZhbGk0NTBAZ21haWwuY29tIiwidWlkIjoiZGFhNGE5NzMtMWZjMS00OWNjLWJiMjUtM2YyYTViOWI4ODhhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkFkbWluIiwiSW5zdHJ1Y3RvciIsIlN0dWRlbnQiXSwiZXhwIjoxNzU0ODMzMDQxLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3Mjc0IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDIwMCJ9.jBAc9kd_Z-fhhbuRkxAWSMQonKpUSVjFli6R4NA_zOA';
  getInstructorById(instructorId: string): Observable<any> {
    return this._http.get(
      `https://lernerra.runasp.net/api/User/${instructorId}`
    );
  }

  getInstructorCourses(instructorId?: string): Observable<any> {
    return this._http.get(`https://lernerra.runasp.net/api/Course/instructor`);
  }

  getInstructorCoursesById(instructorId: string): Observable<any> {
    return this._http.get(
      `https://lernerra.runasp.net/api/Course/instructor/${instructorId}`
    );
  }

  updateCourse(courseId: any, course: ICourse): Observable<any> {
    return this._http.put(
      `https://lernerra.runasp.net/api/Course/${courseId}`,
      course,
      { responseType: 'text' }
    );
  }

  updateInstructor(data: any) {
    return this._http.put(`https://lernerra.runasp.net/api/User/update`, data);
  }

  getAllInstructors(): Observable<any> {
    return this._http.get(
      `https://lernerra.runasp.net/api/User/role/instructor`
    );
  }
}
