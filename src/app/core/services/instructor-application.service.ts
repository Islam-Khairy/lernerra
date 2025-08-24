import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  instructorApplicationResponse,
  ReviewDto,
} from '../../Shared/Models/InstructorApplication';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstructorApplicationService {
  http = inject(HttpClient);
  private readonly url = 'https://lernerra.runasp.net/api';

  addApplication(application: any) {
    return this.http.post(
      this.url + '/instructorapplication/apply',
      application
    );
  }

  getApplications(): Observable<instructorApplicationResponse[]> {
    return this.http.get<instructorApplicationResponse[]>(
      this.url + '/instructorapplication'
    );
  }

  getApplicationById(id: number): Observable<instructorApplicationResponse> {
    return this.http.get<instructorApplicationResponse>(
      this.url + `/instructorapplication/${id}`
    );
  }

  postReview(review: ReviewDto): Observable<{ review: boolean }> {
    return this.http.put<{ review: boolean }>(
      this.url + '/instructorapplication/review',
      review
    );
  }
}
