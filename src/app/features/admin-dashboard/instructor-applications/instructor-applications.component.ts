import { Component, effect, inject, signal } from '@angular/core';
import { InstructorApplicationService } from '../../../Core/Services/instructor-application.service';
import { AccountService } from '../../../Core/Services/account.service';
import { MessageService } from 'primeng/api';
import {
  instructorApplicationResponse,
  ReviewDto,
} from '../../../Shared/Models/InstructorApplication';
import { ApplicationCardComponent } from './application-card/application-card.component';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-instructor-applications',
  imports: [ApplicationCardComponent, Toast],
  templateUrl: './instructor-applications.component.html',
  styleUrl: './instructor-applications.component.css',
})
export class InstructorApplicationsComponent {
  applicationService = inject(InstructorApplicationService);
  accountService = inject(AccountService);
  messageService = inject(MessageService);
  applications = signal<instructorApplicationResponse[] | null>(null);

  constructor() {
    effect(() => {
      this.applicationService.getApplications().subscribe({
        next: (applications) => {
          const sortedApplications = applications.sort(
            (a, b) => a.status - b.status
          );
          this.applications.set(sortedApplications);
        },
      });
    });
  }

  sendReview(event: { isApproved: boolean; id: number | undefined }) {
    const user = this.accountService.user();
    if (user === null) {
      console.error('an error occured while reading the user');
      return;
    }
    if (event.id == undefined) {
      console.error('error reading id of the application');
      return;
    }
    const review: ReviewDto = {
      reviewerAdminEmail: user?.email!,
      applicationId: event.id,
      isApproved: event.isApproved,
    };

    this.applicationService.postReview(review).subscribe({
      next: (result) => {
        const currentApplications = this.applications();
        if (!currentApplications) return;

        if (result.review) {
          const updated = currentApplications.map((x) => {
            return x.id === event.id ? { ...x, status: 1 } : x;
          });
          this.applications.set(updated);
          this.messageService.add({
            severity: 'success',
            summary: 'Application Accepted',
            detail: 'The application was accepted successfully',
          });
        } else {
          const filtered = currentApplications.filter((x) => x.id !== event.id);
          this.applications.set(filtered);
          this.messageService.add({
            severity: 'warn',
            summary: 'Application Rejected',
            detail: 'The application was rejected and removed.',
          });
        }
      },
    });
  }
}
