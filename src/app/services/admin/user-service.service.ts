import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getAllUsersByRole(role: string): Observable<any> {
    return this._http.get(`https://lernerra.runasp.net/api/User/role/${role}`);
  }

  addAdmin(email: string): Observable<any> {
    return this._http.post(`https://lernerra.runasp.net/api/User/addAdmin`, {
      email,
    });
  }
}
