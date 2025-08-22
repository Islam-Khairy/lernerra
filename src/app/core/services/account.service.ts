import { effect, inject, Injectable, signal } from '@angular/core';
import { User, UserInfo } from '../../Shared/Models/User';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  user = signal<User | null>(null);
  private http = inject(HttpClient);
  private url = 'http://lernerra.runasp.net/api';

  constructor() {
    effect(() => {
      this.loadAuthenticatedUser();
      const user = this.user();
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('currentUser');
      }
    });
  }

  private loadAuthenticatedUser() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      try {
        this.user.set(JSON.parse(userData));
      } catch (error) {
        console.error(error);
        localStorage.removeItem('currentUser');
        this.user.set(null);
      }
    }
  }

  login(credentials: any) {
    return this.http.post<User>(this.url + '/user/login', credentials).pipe(
      tap((user: any) => {
        if (user.token) {
          this.user.set(user);
          localStorage.setItem('token', user.token);
          console.log(user);
        }
      })
    );
  }

  register(data: any) {
    console.log(data);
    return this.http.post(this.url + '/user/register', data);
  }

  forgetPassword(value: any) {
    return this.http.post(this.url + '/PasswordReset/request', value);
  }

  resetPassword(values: any) {
    console.log(values);
    return this.http.post(this.url + '/PasswordReset/reset', values);
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  getUserById() {
    return this.http.get(this.url + '/user');
  }

  getUserInfo() {
    return this.http.get<UserInfo>(this.url + '/user/user-info');
  }
}
