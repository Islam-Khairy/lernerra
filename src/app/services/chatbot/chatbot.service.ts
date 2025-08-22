import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  askQuestion(question: string) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<{ answer: string }>(
      `${this.baseUrl}/ask`,
      { question },
      { headers }
    );
  }

  getChatHistory() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(`${this.baseUrl}/chat-history`, { headers });
  }
}
