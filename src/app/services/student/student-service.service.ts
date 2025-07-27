import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private _http:HttpClient){
  }
studentId:string='1';
token:any
ngOnInit(): void {
  this.getToken()
  
}

  getToken(){
    this.token=localStorage.getItem("userToken")
  }

  updateStudent(student:any):Observable<any>{
    return this._http.post(`http://localhost:5138/api/User/update`,student/*,{headers:this.token}*/)
  }

   getStudentbById():Observable<any>{
    return this._http.get(`http://localhost:5138/api/User/1`/*${this.studentId}`,{headers:this.token}*/)
  }
}
