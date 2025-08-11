import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { UserRole } from '../../Shared/Models/User';

export const authGuard=(allowedRoles:string[]): CanActivateFn =>{
return (route, state) => {
  const accountService=inject(AccountService)
  const user=accountService.user()
  const router=inject(Router)
  if(!user){
    router.navigateByUrl("/log-in")
    return false
  }

  if(allowedRoles.length>0){
   const isInRole=user?.roles.some(role => allowedRoles.includes(role));
    if(!isInRole){
      router.navigateByUrl("/access-denied")
      return false
    }
    return true
  }
  return true
  
};
}
