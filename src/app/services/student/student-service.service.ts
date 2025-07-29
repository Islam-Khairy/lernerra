import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { AccountService } from '../../core/services/account.service';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private _http:HttpClient){
  }

  updateStudent(student:any):Observable<any>{
    return this._http.post(`http://localhost:5138/api/User/update`,student)
  }

   getStudentbById(studentId:string):Observable<any>{
    return this._http.get(`http://localhost:5138/api/User/${studentId}`)
  }
  
}
