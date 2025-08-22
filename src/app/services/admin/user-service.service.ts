import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getAllUsersByRole(role: string): Observable<any> {
    return this._http.get(`${environment.apiUrl}/User/role/${role}`);
  }

  addAdmin(email: string): Observable<any> {
    return this._http.post(`${environment.apiUrl}/User/addAdmin`, {
      email,
    });
  }
}
