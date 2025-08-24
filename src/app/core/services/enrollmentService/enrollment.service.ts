import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  constructor(private http: HttpClient) {}

  enrollFreeCourse(enrollmentData: any): Observable<any> {
    console.log('call api ', enrollmentData);
    var res = this.http.post(
      `${environment.apiUrl}/Enrollment/enroll`,
      enrollmentData
    );
    console.log(res);

    return res;
  }

  getStudentEnrolledCourses(): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/Enrollment/user/courses`
    );
  }
}
