import { Injectable, inject, signal } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable, tap, catchError, throwError } from "rxjs"
import { Router } from "@angular/router"
import { isPlatformBrowser } from "@angular/common"
import { PLATFORM_ID } from "@angular/core"

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  token: string
}

export interface User {
  id: number
  email: string
  roleId: number
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly API_URL = "http://localhost:3000"
  private readonly TOKEN_KEY = "auth_token"
  private readonly platformId = inject(PLATFORM_ID)

  private isAuthenticatedSignal = signal<boolean>(this.hasToken())
  public isAuthenticated = this.isAuthenticatedSignal.asReadonly()

  private currentUserSignal = signal<User | null>(this.getUserFromToken())
  public currentUser = this.currentUserSignal.asReadonly()

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    if (this.hasToken()) {
      const user = this.getUserFromToken()
      if (user) {
        this.currentUserSignal.set(user)
        this.isAuthenticatedSignal.set(true)
      } else {
        this.logout()
      }
    }
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/user/login`, credentials).pipe(
      tap((response) => {
        this.setToken(response.token)
        const user = this.getUserFromToken()
        this.currentUserSignal.set(user)
        this.isAuthenticatedSignal.set(true)
      }),
      catchError((error) => {
        console.error("Login failed", error)
        return throwError(() => new Error(error.error || "Login failed"))
      }),
    )
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY)
    }
    this.isAuthenticatedSignal.set(false)
    this.currentUserSignal.set(null)
    this.router.navigate(["/logging/login"])
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.TOKEN_KEY)
    }
    return null
  }

  private setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.TOKEN_KEY, token)
    }
  }

  private hasToken(): boolean {
    return !!this.getToken()
  }

  private getUserFromToken(): User | null {
    const token = this.getToken()
    if (!token) return null

    try {
      const base64Url = token.split(".")[1]
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join(""),
      )

      return JSON.parse(jsonPayload) as User
    } catch (error) {
      console.error("Error decoding token", error)
      return null
    }
  }

  getAuthHeaders() {
    const token = this.getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId)
  }
}
