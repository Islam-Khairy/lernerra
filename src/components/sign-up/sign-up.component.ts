import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { AccountService } from '../../app/core/services/account.service';
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
    this.accountService.register(this.signUpForm.value).subscribe()
  }
}
