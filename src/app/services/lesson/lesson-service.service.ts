import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILesson } from '../../interfaces/lesson/ilesson';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(private _http: HttpClient) {}

  uploadLesson(lesson: any): Observable<any> {
    return this._http.post(`http://lernerra.runasp.net/api/Lesson`, lesson, {
      responseType: 'text',
    });
  }

  getLessons(courseId: number): Observable<any> {
    return this._http.get(
      `http://lernerra.runasp.net/api/Lesson/course/${courseId}`
    );
  }

  updateLesson(lessonId: number, lesson: any): Observable<any> {
    return this._http.put(
      `http://lernerra.runasp.net/api/Lesson/${lessonId}`,
      lesson,
      { responseType: 'text' }
    );
  }

  deleteLesson(lessonId: number): Observable<any> {
    return this._http.delete(
      `http://lernerra.runasp.net/api/Lesson/${lessonId}`,
      { responseType: 'text' }
    );
  }
}
