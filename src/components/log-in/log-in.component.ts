import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../app/core/services/account.service';
@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  accountService = inject(AccountService);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: () => {
        if (this.accountService.user()?.roles.includes('Admin')) {
          this.router.navigateByUrl('/admin-dashboard');
        } else if (this.accountService.user()?.roles.includes('Instructor')) {
          this.router.navigateByUrl('/instructor-dashboard');
        } else if (this.accountService.user()?.roles.includes('Student')) {
          this.router.navigateByUrl('');
        } else {
          this.router.navigateByUrl('');
        }
      },
    });
  }
}
