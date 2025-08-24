import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursePrograssService {
  constructor(private http: HttpClient) {}

  getCoursePrograss(courseId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/CourseProgress/${courseId}`);
  }

  markLessonAsCompleted(lessonId: number, userId: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/CourseProgress/complete`, {
      userId: userId,
      lessonId: lessonId,
    });
  }
}
