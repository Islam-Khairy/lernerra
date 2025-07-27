import { Routes } from '@angular/router';
import { UpdateProfileComponent } from '../components/student/student-profile-sections/update-profile/update-profile.component';
import { StudentProfileSectionsComponent } from '../components/student/student-profile-sections/student-profile-sections.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { LogInComponent } from '../components/log-in/log-in.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ForgetPasswordComponent } from '../components/log-in/forget-password/forget-password.component';
import { ResetPasswordComponent } from '../components/log-in/reset-password/reset-password.component';
import { CourseDetailsComponent } from './features/course-details/course-details.component';
import { InstructorDetailsComponent } from './features/instructor-details/instructor-details.component';
import { CategoryComponent } from './features/category/category.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'student',
    component: StudentProfileSectionsComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'log-in',
    component: LogInComponent,
  },
  {
    path:'forget-password',
    component:ForgetPasswordComponent
  },
  { path:'reset-password',
    component:ResetPasswordComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'course',
    component:CourseDetailsComponent
  },
  {
    path:'instructor',
    component:InstructorDetailsComponent
  },
  {
    path:'category',
    component:CategoryComponent
  }
]