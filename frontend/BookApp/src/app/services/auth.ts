import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../models/register';
import { Login } from '../models/login';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) { };

  register(data: Register): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
  login(data: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
  LoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
