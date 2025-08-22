import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  checkout(requestData: any): Observable<any> {
    return this.http.post(
      'http://lernerra.runasp.net/api/Payment/create-payment-intent',
      requestData
    );
  }
}
