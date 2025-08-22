import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private baseUrl = 'http://lernerra.runasp.net/api/chatbot';

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
