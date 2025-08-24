import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private _http: HttpClient) {}
  updateStudent(student: any): Observable<any> {
    return this._http.put(
      `https://lernerra.runasp.net/api/User/update`,
      student
    );
  }

  getStudentbById(studentId: string): Observable<any> {
    return this._http.get(`https://lernerra.runasp.net/api/User/${studentId}`);
  }
}
