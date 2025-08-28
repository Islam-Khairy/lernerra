
import { Component, inject } from '@angular/core';
import {  FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../app/core/services/account.service';


@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  fb=inject(FormBuilder)
  accountService=inject(AccountService)
 
  resetForm=this.fb.group({
    email:['',[Validators.required,Validators.email]]
  })
  isEmailSent=false
  onSubmit(){
    this.accountService.forgetPassword(this.resetForm.value).subscribe({
      next:()=>this.isEmailSent=true,
      error:(err)=>console.log(err)
    })
  }
  showInfo(){
 
  }
}
