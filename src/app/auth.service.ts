import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { Roles, RolesId } from './authorities-constants';
import { Router } from '@angular/router';
import { IUser } from './user.model';

/*servicio de autenticacion*/

@Injectable({
  providedIn: 'root', //en toda la aplicacion
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly ROLE_KEY = 'role';
  private readonly apiUrl = '/api';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  public isLoggedIn$: Observable<boolean> =
    this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body: IUser = { username, password }; // Usuario y contraseña

    return this.http
      .post<{ token: string }>(`${this.apiUrl}/Login/login`, body, { headers })
      .pipe(
        // Usar tap para guardar el token de la respuesta
        tap((response) => {
          localStorage.setItem(this.TOKEN_KEY, response.token); // Guardamos el token en localStorage
        }),
        // Llamar a la API de perfil y guardar el rol después de obtener el token
        switchMap(() => this.profile()), // Usamos switchMap para realizar la llamada a profile después de obtener el token
        tap((res) => {
          if (res.role) {
            localStorage.setItem(this.ROLE_KEY, res.role); // Guardamos el rol en localStorage
          }
        }),
        // Al final de todo, indicamos que el login fue exitoso y emitimos el valor de loggedIn
        map(() => {
          this.isLoggedInSubject.next(true); // Emitimos que el usuario está logueado
          return true; // El login fue exitoso
        }),
        catchError(() => {
          this.isLoggedInSubject.next(false); // Si hubo error, emitimos false
          return of(false); // Retornamos false en caso de error
        })
      );
  }


  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    this.isLoggedInSubject.next(false);
  }

  /*para registrar usuarios*/
  register(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body: IUser = { username, password, roleId: RolesId.USER };

    return this.http
      .post<{ token: string }>(`${this.apiUrl}/Login/register`, body, {
        headers,
      })
      .pipe(
        tap((response) => {
          console.log('Respuesta del Register', response);
        }),
        map(() => true),
        catchError(() => of(false))
      );
  }

  profile(): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/Users/profile`).pipe(
      tap((response) => {
        console.log('Respuesta del profile', response);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAdmin(): boolean {
    return localStorage.getItem(this.ROLE_KEY) === Roles.ADMIN;
  }
}
