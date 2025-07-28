import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../Shared/Models/User';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  user=signal<User|null>(null)
  private http=inject(HttpClient)
  private url='http://localhost:5138/api'
  
  
  login(credentials:any){
   return this.http.post<User>(this.url+'/user/login',credentials).pipe
   (
    tap(user=>{
      if(user.token){
        this.user.set(user)
        localStorage.setItem('token',user.token)
      }
    })
   )
  }

  register(data:any){
      return this.http.post<{confirmationCode:string}>(this.url+'/user/register',{data})
  }

  forgetPassword(value:any){
   return this.http.post(this.url+'/PasswordReset/request',value)
  }


  resetPassword(values:any){
    console.log(values)
    return this.http.post(this.url +'/PasswordReset/reset',values)
  }

  logout(){
    this.user.set(null)
    localStorage.removeItem('token')
  }

}
