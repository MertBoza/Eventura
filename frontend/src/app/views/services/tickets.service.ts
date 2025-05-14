
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export interface Ticket {
  id?: number;
  eventId: number;
  userId: number;
  price: number;
  status?: 'available' | 'reserved' | 'sold' | string;
  event?: any;
  user?: any;
}

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly API_URL = 'http://localhost:3000/tickets';
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  getTickets(userId?: number, eventId?: number): Observable<Ticket[]> {
    let params = new HttpParams();
    if (userId) params = params.set('userId', userId.toString());
    if (eventId) params = params.set('eventId', eventId.toString());

    return this.http.get<Ticket[]>(this.API_URL, {
      headers: this.getAuthHeaders(),
      params,
    }).pipe(
      catchError(error => {
        console.error('Error fetching tickets:', error);
        return throwError(() => new Error(error.message || 'Failed to fetch tickets'));
      })
    );
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.API_URL, ticket, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError(error => {
        console.error('Error creating ticket:', error);
        return throwError(() => new Error(error.message || 'Failed to create ticket'));
      })
    );
  }

  updateTicket(id: number, ticket: Partial<Ticket>): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.API_URL}/${id}`, ticket, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError(error => {
        console.error('Error updating ticket:', error);
        return throwError(() => new Error(error.message || 'Failed to update ticket'));
      })
    );
  }

  deleteTicket(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError(error => {
        console.error('Error deleting ticket:', error);
        return throwError(() => new Error(error.message || 'Failed to delete ticket'));
      })
    );
  }
}
