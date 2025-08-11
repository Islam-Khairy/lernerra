import { Routes } from '@angular/router';
import { StudentProfileSectionsComponent } from '../components/student/student-profile-sections/student-profile-sections.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { LogInComponent } from '../components/log-in/log-in.component';
import { ShoppingCartComponent } from '../components/shopping-cart/shopping-cart.component';
import { CheckOutPageComponent } from '../components/check-out-page/check-out-page.component';
import { OrderCompletedComponent } from '../components/order-completed/order-completed.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ForgetPasswordComponent } from '../components/log-in/forget-password/forget-password.component';
import { ResetPasswordComponent } from '../components/log-in/reset-password/reset-password.component';
import { CourseDetailsComponent } from './features/course-details/course-details.component';
import { InstructorDetailsComponent } from './features/instructor-details/instructor-details.component';
import { CategoryComponent } from './features/category/category.component';
import { SidebarComponent } from '../components/instructor/sidebar/sidebar.component';
import { AddCourseComponent } from '../components/instructor/sidebar/add-course/add-course.component';
import { AdminsComponent } from './features/admins/admins.component';
import { AddAdminComponent } from './features/admins/add-admin/add-admin.component';
import { AdminCoursesComponent } from './features/admin-courses/admin-courses.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { SuccessComponent } from './Shared/success/success.component';
import { ApplicationFormComponent } from './features/application-form/application-form.component';
import { InstructorApplicationsComponent } from './features/admin-dashboard/instructor-applications/instructor-applications.component';
import { UpdatedSuccssfullyComponent } from './Shared/updated-succssfully/updated-succssfully.component';

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
    path: 'shopping-cart',
    component: ShoppingCartComponent,
  },
  {
    path: 'check-out',
    component: CheckOutPageComponent,
  },
  {
    path: 'order-completed',
    component: OrderCompletedComponent,
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'course/:id',
    component: CourseDetailsComponent,
  },
  {
    path: 'instructor',
    component: InstructorDetailsComponent,
  },
  {
    path: 'instructor/:id',
    component: InstructorDetailsComponent,
  },
  {
    path: 'category/:id',
    component: CategoryComponent,
  },
  {
    path: 'instructor-dashboard',
    component: SidebarComponent,
  },
  {
    path: 'add-course',
    component: AddCourseComponent,
  },
  {
    path: 'Admins',
    component: AdminsComponent,
  },
  {
    path: 'addAdmin',
    component: AddAdminComponent,
  },
  {
    path: 'adminCourses',
    component: AdminCoursesComponent,
  },
  {
    path: 'application-form',
    component: ApplicationFormComponent,
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'instructor-applications',
        component: InstructorApplicationsComponent,
      },
    ],
  },
  {
    path: 'success',
    component: SuccessComponent,
  },
  {
    path:'data-updated',
    component:UpdatedSuccssfullyComponent
  }
];
