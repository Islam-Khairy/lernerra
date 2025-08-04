import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { InstructorApplicationService } from '../../core/services/instructor-application.service';
import { instructorApplicationResponse, ReviewDto } from '../../Shared/Models/InstructorApplication';
import { ApplicationCardComponent } from './instructor-applications/application-card/application-card.component';
import { Divider } from "primeng/divider";
import { AccountService } from '../../core/services/account.service';
import { ToastModule, Toast } from 'primeng/toast';
import { Button } from "primeng/button";
import { MessageService } from 'primeng/api';
import { _supportsShadowDom } from '@angular/cdk/platform';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, RouterLinkActive, ApplicationCardComponent, Divider, Toast, Button, RouterOutlet],
  templateUrl: './admin-dashboard.component.html',
  providers:[MessageService],
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  



}
