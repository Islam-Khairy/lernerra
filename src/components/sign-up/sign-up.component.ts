import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { AccountService } from '../../app/core/services/account.service';
import { registerDto } from '../../app/Shared/Models/User';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {  ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-sign-up',
  imports: [DividerModule,ReactiveFormsModule,ToastModule],
  providers:[MessageService],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  fb=inject(FormBuilder)
  accountService=inject(AccountService)
  messageService=inject(MessageService)
  router=inject(Router)
  signUpForm=this.fb.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    userName:['',[Validators.required,Validators.maxLength(40)]],
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required],
    confirmPassword:['',Validators.required]
  },
    
  )

  constructor(){
    this.signUpForm.addValidators(SignUpComponent.passwordMatchValidator)
  }

 static passwordMatchValidator(formGroup: AbstractControl):ValidationErrors | null {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
  } 

  onSubmit(){
    const data = this.signUpForm.value
    const registerDto:registerDto={
      fullName:data.firstName+' '+data.lastName,
      email:data.email!,
      password:data.password!,
      confirmPassword:data.confirmPassword!
    }
    this.accountService.register(registerDto).subscribe({
      next:()=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Registered Successfully',
          detail: 'please login'
        });
      this.router.navigateByUrl("/log-in")
      },
<<<<<<< HEAD
      error: (error) => {
        console.log('error: ', error);

        if (error.error?.errors) {
          Object.entries(error.error.errors).forEach(([field, messages]) => {
            (messages as string[]).forEach((message: string) => {
              this.messageService.add({
                severity: 'error',
                summary: `Registration Failed - ${field}`,
                detail: message,
              });
            });
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Registration Failed',
            detail: 'An unexpected error occurred',
          });
        }
      },
    });
=======
      error:(error)=>{
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Registration Failed',
        //   detail: error.error
        // });
      }
    })
>>>>>>> 71848cad6d1795809ce6fa08667cfe10e1438603
  }
}