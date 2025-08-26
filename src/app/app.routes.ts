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
import { Component } from '@angular/core';
import { StudentCoursesComponent } from '../components/student/student-courses/student-courses.component';
import { SidebarComponent } from '../components/instructor/sidebar/sidebar.component';
import { AddCourseComponent } from '../components/instructor/sidebar/add-course/add-course.component';
import { AdminsComponent } from './features/admins/admins.component';
import { AddAdminComponent } from './features/admins/add-admin/add-admin.component';
import { AdminCoursesComponent } from './features/admin-courses/admin-courses.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { SuccessComponent } from './Shared/success/success.component';
import { ApplicationFormComponent } from './features/application-form/application-form.component';
import { InstructorApplicationsComponent } from './features/admin-dashboard/instructor-applications/instructor-applications.component';
import { UserRole } from './Shared/Models/User';
import { AccessDeniedComponent } from './Shared/access-denied/access-denied.component';
import { StudentCourseComponent } from '../components/student/student-course/student-course.component';
import { UpdateCourseComponent } from '../components/instructor/sidebar/update-course/update-course.component';
import { authGuard } from '../../src/app/core/guards/auth.guard';
import { UpdateProfileComponent } from '../components/student/student-profile-sections/update-profile/update-profile.component';
import { enrollCourseGuard } from './core/guards/enrollCourseGuard';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Home',
  },
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Home',
  },
  {
    path: 'student',
    component: StudentProfileSectionsComponent,
    canActivate: [authGuard([UserRole.Student])],
    title: 'My Profile',
    children: [
      {
        path: 'student-profile',
        component: UpdateProfileComponent,
        title: 'My Profile',
      },
      {
        path: 'student-courses',
        component: StudentCoursesComponent,
        title: 'My Courses',
      },
    ],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'Sign Up',
  },
  {
    path: 'log-in',
    component: LogInComponent,
    title: 'Log In',
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    title: 'Shopping Cart',
  },
  {
    path: 'check-out',
    component: CheckOutPageComponent,
    canActivate: [authGuard([UserRole.Student])],
    title: 'Check Out',
  },
  {
    path: 'order-completed',
    component: OrderCompletedComponent,
    title: 'Order Completed',
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    title: 'Forget Password',
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    title: 'Reset Password',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  {
    path: 'course/:id',
    component: CourseDetailsComponent,
    title: 'Course Details',
  },
  {
    path: 'instructor/:id',
    component: InstructorDetailsComponent,
    title: 'Instructor Details',
  },
  {
    path: 'category/:id',
    component: CategoryComponent,
    title: 'Category Details',
  },
  {
    path: 'instructor-dashboard',
    component: SidebarComponent,
    canActivate: [authGuard([UserRole.Instructor])],
    title: 'Instructor Dashboard',
  },
  {
    path: 'add-course',
    component: AddCourseComponent,
    title: 'Add Course',
  },
  {
    path: 'update-course/:id',
    component: UpdateCourseComponent,
    title: 'Update Course',
  },
  {
    path: 'addAdmin',
    component: AddAdminComponent,
    title: 'Add Admin',
  },

  {
    path: 'application-form',
    component: ApplicationFormComponent,
    title: 'Application Form',
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    title: 'Admin Dashboard',
    children: [
      {
        path: 'instructor-applications',
        component: InstructorApplicationsComponent,
        title: 'Instructor Applications',
      },
      {
        path: 'adminCourses',
        component: AdminCoursesComponent,
        title: 'Admin Courses',
      },
      {
        path: 'Admins',
        component: AdminsComponent,
        title: 'Admins',
      },
    ],
    canActivate: [authGuard([UserRole.Admin])],
  },
  {
    path: 'success',
    component: SuccessComponent,
    title: 'Success',
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
    title: 'Access Denied',
  },
  {
    path: 'owned-course/:id',
    component: StudentCourseComponent,
    title: 'My Course',
    canActivate: [enrollCourseGuard],
  },
  {
    path: '**',
    component: HomePageComponent,
  },
];
