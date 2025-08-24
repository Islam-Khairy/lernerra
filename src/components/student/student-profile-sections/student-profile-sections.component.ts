import { Component, effect, signal } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AccountService } from '../../../app/core/services/account.service';
@Component({
  selector: 'app-student-profile-sections',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './student-profile-sections.component.html',
  styleUrl: './student-profile-sections.component.css',
})
export class StudentProfileSectionsComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
    effect(() => {
      this.studentName.set(this.accountService.user()?.fullName || '');
      this.studentImage.set(this.accountService.user()?.pictureUrl || '');
    });
  }
  profileSections = ['Profile', 'My Courses'];
  selectedSection = 0;
  courseId = 0;
  studentName = signal<string>('');
  studentImage = signal<string>('');
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const sectionFromUrl = Number(params['section']);
      if (
        !isNaN(sectionFromUrl) &&
        sectionFromUrl >= 0 &&
        sectionFromUrl < this.profileSections.length
      ) {
        this.selectedSection = sectionFromUrl;
      }
    });

    this.route.queryParamMap.subscribe((params) => {
      this.courseId = +params.get('id')!;
      console.log('id from profile', this.courseId);
    });
  }
  selectSection(index: number) {
    this.selectedSection = index;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { section: index },
      queryParamsHandling: 'merge',
    });
  }
}
