import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  getSpecificCourse(courseId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/Course/${courseId}`);

  }
}
