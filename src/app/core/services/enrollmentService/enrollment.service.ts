import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  constructor(private http: HttpClient) {}

  enrollFreeCourse(enrollmentData: any): Observable<any> {
    console.log('call api ', enrollmentData);
    var res = this.http.post(
      'https://lernerra.runasp.net/api/Enrollment/enroll',
      enrollmentData
    );
    console.log(res);

    return res;
  }

  getStudentEnrolledCourses(): Observable<any> {
    return this.http.get(
      `https://lernerra.runasp.net/api/Enrollment/user/courses`
    );
  }
}
