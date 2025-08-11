import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 const accountService=inject(AccountService)
 const router=inject(Router)
  var token =localStorage.getItem('token')
  var isApiUrl=req.url.startsWith('http://localhost:5138/api')
  if(token&&isApiUrl){
  var ModifiedRequest= req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })
  return next(ModifiedRequest).pipe(
    catchError((err:HttpErrorResponse)=>{
      if(err.status===401){
        accountService.user.set(null)
        localStorage.removeItem("token")
        localStorage.removeItem("currentUser")
        router.navigateByUrl("/log-in")
      }
      return throwError(()=>err)
    })
  )
  }
  return next(req);
};
