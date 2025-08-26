import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private _http: HttpClient) {}
  updateStudent(student: any): Observable<any> {
    return this._http.put(
      `${environment.apiUrl}/User/update`,
      student
    );
  }

  getStudentbById(studentId: string): Observable<any> {
    return this._http.get(`${environment.apiUrl}/User/${studentId}`);
  }
}
