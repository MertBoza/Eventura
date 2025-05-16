import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export interface Privilege {
  id?: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  privileges: Privilege[];
}

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly API_URL = 'http://localhost:3000/roles';
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.API_URL, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError((error) => {
        console.error('Error fetching roles', error);
        return throwError(() => new Error(error.message || 'An error occurred'));
      })
    );
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.API_URL}/${id}`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError((error) => {
        console.error('Error fetching role by ID', error);
        return throwError(() => new Error(error.message || 'An error occurred'));
      })
    );
  }

  createRole(role: { name: string; description: string; privileges: Privilege[] }): Observable<Role> {
    return this.http.post<Role>(this.API_URL, role, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError((error) => {
        console.error('Error creating role', error);
        return throwError(() => new Error(error.message || 'An error occurred'));
      })
    );
  }

  updateRole(id: number, role: { name: string; description: string; privileges: Privilege[] }): Observable<Role> {
    return this.http.put<Role>(`${this.API_URL}/${id}`, role, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError((error) => {
        console.error('Error updating role', error);
        return throwError(() => new Error(error.message || 'An error occurred'));
      })
    );
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError((error) => {
        console.error('Error deleting role', error);
        return throwError(() => new Error(error.message || 'An error occurred'));
      })
    );
  }
}
