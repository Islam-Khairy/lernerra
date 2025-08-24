import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Divider } from 'primeng/divider';
import { AccountService } from '../../../app/Core/Services/account.service';
import { MessageService } from 'primeng/api';
import { _supportsShadowDom } from '@angular/cdk/platform';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    RouterLink,
    RouterLinkActive,
    Divider,
    RouterOutlet,
  ],
  templateUrl: './admin-dashboard.component.html',
  providers: [MessageService],
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  accountService = inject(AccountService);
  adminName = signal<string>('');
  adminImage = signal<string>('');

  constructor() {
    effect(() => {
      const user = this.accountService.user();
      if (user) {
        this.adminName.set(this.accountService.user()?.fullName || '');
        this.adminImage.set(this.accountService.user()?.pictureUrl || '');
      }
    });
  }
}
