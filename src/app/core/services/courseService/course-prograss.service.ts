import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursePrograssService {
  constructor(private http: HttpClient) {}

  getCoursePrograss(courseId: number): Observable<any> {
    return this.http.get(
      `http://lernerra.runasp.net/api/CourseProgress/${courseId}`
    );
  }

  markLessonAsCompleted(lessonId: number, userId: string): Observable<any> {
    return this.http.post(
      `http://lernerra.runasp.net/api/CourseProgress/complete`,
      {
        userId: userId,
        lessonId: lessonId,
      }
    );
  }
}
