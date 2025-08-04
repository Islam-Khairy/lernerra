import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { AccountService } from '../../app/core/services/account.service';
import { registerDto } from '../../app/Shared/Models/User';
@Component({
  selector: 'app-sign-up',
  imports: [DividerModule,ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  fb=inject(FormBuilder)
  accountService=inject(AccountService)
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
    this.accountService.register(registerDto).subscribe()
  }
}
