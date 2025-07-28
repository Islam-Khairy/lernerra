import { Routes } from '@angular/router';
import { StudentProfileSectionsComponent } from '../components/student/student-profile-sections/student-profile-sections.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { LogInComponent } from '../components/log-in/log-in.component';
import { ShoppingCartComponent } from '../components/shopping-cart/shopping-cart.component';
import { CheckOutPageComponent } from '../components/check-out-page/check-out-page.component';
import { OrderCompletedComponent } from '../components/order-completed/order-completed.component';

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
  }
];
