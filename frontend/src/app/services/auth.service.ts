import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/usuarios';
  private authStatus = new BehaviorSubject<boolean>(false);
  private userRole: string | null = null;
  private userName: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.checkSession();
  }

  // ✅ Iniciar sesión y gestionar sesión en el frontend
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ message: string, role: string, nombre: string }>(
      `${this.apiUrl}/login`, 
      { email, password }, 
      { withCredentials: true }
    ).pipe(
      tap(response => {
        this.userRole = response.role;
        this.userName = response.nombre;
        this.authStatus.next(true);
        this.redirectUser();
      })
    );
  }

  // ✅ Verifica si hay una sesión activa en el backend
  checkSession(): void {
    this.http.get<{ id: string, role: string, nombre: string }>(
      `${this.apiUrl}/session`, 
      { withCredentials: true }
    ).subscribe({
      next: (response) => {
        this.userRole = response.role;
        this.userName = response.nombre;
        this.authStatus.next(true);
        this.redirectUser();
      },
      error: () => {
        this.authStatus.next(false);
        this.userRole = null;
        this.userName = null;
      }
    });
  }

  // ✅ Cerrar sesión
  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe(() => {
      this.authStatus.next(false);
      this.userRole = null;
      this.userName = null;
      this.router.navigate(['/login']);
    });
  }

  // ✅ Redirigir usuario según su rol
  private redirectUser(): void {
    if (this.userRole === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/cliente']);
    }
  }

  // ✅ Métodos para obtener el estado de autenticación y el rol del usuario
  isAuthenticated(): boolean {
    return this.authStatus.value;
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  getUserName(): string | null {
    return this.userName;
  }
}
