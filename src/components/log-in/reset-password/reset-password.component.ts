import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../app/core/services/account.service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  accountService = inject(AccountService);
  router = inject(Router);
  email = signal('');
  token = signal('');
  isSubmited = signal<boolean>(false);

  resetPassword = this.fb.group({
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const params = this.route.snapshot.queryParamMap;
      this.email.set(params.get('email') || '');
      this.token.set(params.get('token') || '');
    });
  }

  onSubmit() {
    this.accountService
      .resetPassword({
        password: this.resetPassword.value.newPassword,
        confirmPassword: this.resetPassword.value.confirmPassword,
        token: this.token(),
        email: this.email(),
      })
      .subscribe({
        next: () => this.isSubmited.set(true),
      });
  }
}
