import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export interface Event {
  id?: number;
  name: string;
  description: string;
  date: string;
  location: string;
  imagePath?: string;
  categoryId: number;
  organizerId: number;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly API_URL = 'http://localhost:3000/events';
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (token) {
      return new HttpHeaders({
        Authorization: Bearer ${token},
      });
    }
    return new HttpHeaders(); 
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.API_URL, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError((error) => {
        console.error('Error fetching events', error);
        return throwError(() => new Error(error.message || 'An error occurred'));
      })
    );
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(${this.API_URL}/${id}, {
      headers: this.getAuthHeaders(), 
    }).pipe(
      catchError((error) => {
        console.error('Error fetching event', error);
        return throwError(() => new Error(error.message || 'An error occurred'));
      })
    );
  }

  createEvent(eventData: Event, imageFile?: File): Observable<Event> {
    const formData = new FormData();
    formData.append('name', eventData.name);
    formData.append('description', eventData.description);
    formData.append('date', eventData.date);
    formData.append('location', eventData.location);
    formData.append('categoryId', eventData.categoryId.toString());
    formData.append('organizerId', eventData.organizerId.toString());

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.post<Event>(this.API_URL, formData, {
      headers: this.getAuthHeaders(), 
    }).pipe(
      catchError((error) => {
        console.error('Error creating event', error);
        return throwError(() => new Error(error.message || 'An error occurred'));
      })
    );
  }

  updateEvent(id: number, eventData: Partial<Event>, imageFile?: File): Observable<Event> {
    const formData = new FormData();

    if (eventData.name) formData.append('name', eventData.name);
    if (eventData.description) formData.append('description', eventData.description);
    if (eventData.date) formData.append('date', eventData.date);
    if (eventData.location) formData.append('location', eventData.location);
    if (eventData.categoryId) formData.append('categoryId', eventData.categoryId.toString());
    if (eventData.organizerId) formData.append('organizerId', eventData.organizerId.toString());
    if (imageFile) formData.append('image', imageFile);

    return this.http.put<Event>(${this.API_URL}/${id}, formData, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError((error) => {
        console.error('Error updating event', error);
        return throwError(() => new Error(error.message || 'An error occurred'));
      })
    );
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(${this.API_URL}/${id}, {
      headers: this.getAuthHeaders(), 
    }).pipe(
      catchError((error) => {
        console.error('Error deleting event', error);
        return throwError(() => new Error(error.message || 'An error occurred'));
      })
    );
  }
}