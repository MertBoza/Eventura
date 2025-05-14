import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly API_URL = 'http://localhost:3000/categories';
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_URL).pipe(
      catchError((error) => {
        console.error('Error fetching categories', error);
        return throwError(() => new Error(error.message || 'An error occurred'));
      })
    );
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.API_URL}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching category', error);
        return throwError(() => new Error(error.message || 'An error occurred'));
      })
    );
  }

  createCategory(category: { name: string }): Observable<Category> {
    return this.http.post<Category>(this.API_URL, category, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError((error) => {
        console.error('Error creating category', error);
        return throwError(() => new Error(error.message || 'An error occurred'));
      })
    );
  }

  updateCategory(id: number, category: { name: string }): Observable<Category> {
    return this.http.put<Category>(`${this.API_URL}/${id}`, category, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError((error) => {
        console.error('Error updating category', error);
        return throwError(() => new Error(error.message || 'An error occurred'));
      })
    );
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError((error) => {
        console.error('Error deleting category', error);
        return throwError(() => new Error(error.message || 'An error occurred'));
      })
    );
  }
}
