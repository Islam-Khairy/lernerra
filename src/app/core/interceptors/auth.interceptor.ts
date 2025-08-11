import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  var token =localStorage.getItem('token')
  var isApiUrl=req.url.startsWith('http://localhost:5138/api')
  if(token&&isApiUrl){
  var ModifiedRequest= req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })
  return next(ModifiedRequest)
  }
  return next(req);
};
