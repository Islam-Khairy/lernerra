import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(private _http: HttpClient) {}

  uploadLesson(lesson: any): Observable<any> {
    return this._http.post(`${environment.apiUrl}/Lesson`, lesson, {
      responseType: 'text',
    });
  }

  getLessons(courseId: number): Observable<any> {
    return this._http.get(
      `${environment.apiUrl}/Lesson/course/${courseId}`
    );
  }

  updateLesson(lessonId: number, lesson: any): Observable<any> {
    return this._http.put(
      `${environment.apiUrl}/Lesson/${lessonId}`,
      lesson,
      { responseType: 'text' }
    );
  }

  deleteLesson(lessonId: number): Observable<any> {
    return this._http.delete(
      `${environment.apiUrl}/Lesson/${lessonId}`,
      { responseType: 'text' }
    );
  }
}
