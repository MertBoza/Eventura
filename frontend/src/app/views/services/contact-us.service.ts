import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  private readonly API_URL = 'http://localhost:3000/contactus';
  private readonly http = inject(HttpClient);

  
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json' 
    });
  }

  sendMessage(data: ContactMessage): Observable<ContactMessage> {
    return this.http.post<ContactMessage>(this.API_URL, data, {
      headers: this.getHeaders()
    }).pipe(
      catchError((error) => {
        console.error('Error sending contact message', error);
        return throwError(() => new Error(error.message || 'Failed to send message'));
      })
    );
  }

  getMessages(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(this.API_URL).pipe(
      catchError((error) => {
        console.error('Error fetching contact messages', error);
        return throwError(() => new Error(error.message || 'Failed to fetch messages'));
      })
    );
  }
}
