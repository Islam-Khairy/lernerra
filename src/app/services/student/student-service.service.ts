import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  token=`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhY2FhMWQ5ZC0yNzk5LTQ1ZjAtOTkwOS05MGYxYjBlMTExZjUiLCJzdWIiOiJzaGVyaWZhbGk0NTBAZ21haWwuY29tIiwiZW1haWwiOiJzaGVyaWZhbGk0NTBAZ21haWwuY29tIiwidWlkIjoiZGFhNGE5NzMtMWZjMS00OWNjLWJiMjUtM2YyYTViOWI4ODhhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkFkbWluIiwiSW5zdHJ1Y3RvciIsIlN0dWRlbnQiXSwiZXhwIjoxNzU0ODM2MTM0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3Mjc0IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDIwMCJ9.lD2g_JgbeR17S3LS9c6-RsHDys8ZmcmYttgB7bogMRM`
  updateStudent(student:any):Observable<any>{
    const headers= new HttpHeaders().set('Authorization',this.token)
    return this._http.put(`http://localhost:5138/api/User/update`,student,{headers})
  }

   getStudentbById(studentId:string):Observable<any>{
    return this._http.get(`http://localhost:5138/api/User/${studentId}`)
  }
  
}
