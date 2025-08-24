import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourse } from '../../interfaces/course/icourse';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private _http: HttpClient) {}
  token: string = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhY2FhMWQ5ZC0yNzk5LTQ1ZjAtOTkwOS05MGYxYjBlMTExZjUiLCJzdWIiOiJzaGVyaWZhbGk0NTBAZ21haWwuY29tIiwiZW1haWwiOiJzaGVyaWZhbGk0NTBAZ21haWwuY29tIiwidWlkIjoiZGFhNGE5NzMtMWZjMS00OWNjLWJiMjUtM2YyYTViOWI4ODhhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkFkbWluIiwiSW5zdHJ1Y3RvciIsIlN0dWRlbnQiXSwiZXhwIjoxNzU0ODM2MTM0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3Mjc0IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDIwMCJ9.lD2g_JgbeR17S3LS9c6-RsHDys8ZmcmYttgB7bogMRM`;
  getStudentCourses(): Observable<any> {
    return this._http.get(`https://lernerra.runasp.net/api/Course/student`);
  }

  getCourseById(courseId: number): Observable<any> {
    return this._http.get(`https://lernerra.runasp.net/api/Course/${courseId}`);
  }

  getCategoryCourses(categoryId: number): Observable<any> {
    return this._http.get(
      `https://lernerra.runasp.net/api/Category/${categoryId}/courses`
    );
  }

  getAllCourses(): Observable<any> {
    return this._http.get(`https://lernerra.runasp.net/api/Course/approved`);
  }

  getCoursesbystatus(courseStatus: number): Observable<any> {
    return this._http.get(
      `https://lernerra.runasp.net/api/Course/Status?courseStatus=${courseStatus}`
    );
  }

  updateCourseStatus(
    courseId: number,
    status: number,
    note: string
  ): Observable<any> {
    return this._http.put(
      `https://lernerra.runasp.net/api/Course/status`,
      {
        courseId: courseId,
        status: status,
        notes: note,
      },
      { responseType: 'text' }
    );
  }

  deleteCourse(courseId: number): Observable<any> {
    return this._http.delete(
      `https://lernerra.runasp.net/api/Course/${courseId}`,
      { responseType: 'text' }
    );
  }

  createCourse(course: any): Observable<any> {
    return this._http.post(
      `https://lernerra.runasp.net/api/Course/Upload`,
      course,
      {
        responseType: 'text',
      }
    );
  }

  getSpecificCourse(courseId: number): Observable<any> {
    return this._http.get(`https://lernerra.runasp.net/api/Course/${courseId}`);
  }

  addRating(CourseId: number, Rating: number): Observable<any> {
    return this._http.post(
      `https://lernerra.runasp.net/api/Course/rate`,
      { courseId: CourseId, rating: Rating },
      { responseType: 'text' }
    );
  }
}
