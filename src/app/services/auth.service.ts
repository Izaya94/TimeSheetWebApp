import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../interfaces/login-request';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { IEmployeeDTOAdd } from '../interfaces/Employee/EmployeeInsert';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private tokenKey = 'token';
  private currentUserSubject: BehaviorSubject<any | null>;
  public currentUser: Observable<any | null>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<any | null>(this.getUserDetail());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}Account/login`, data)
      .pipe(
        map((response) => {
          if (response.flag) {
            localStorage.setItem(this.tokenKey, response.token);
            this.currentUserSubject.next(this.getUserDetail());
          }
          return response;
        })
      );
  }

  register(data: IEmployeeDTOAdd): Observable<AuthResponse>{
    return this.http
    .post<AuthResponse>(`${this.apiUrl}Employee/add`, data);
  }

  getUserDetail(): any | null {
    const token = this.getToken();
    if(!token) return null;
    const decodedToken:any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.nameid,
      name: decodedToken.name,
      email: decodedToken.email,
      roles: decodedToken.role || [],
    }; 

    return userDetail;
  }

  get currentUserValue(): any | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if(!token) return false;
    return !this.isTokenExpired();
  };

  private isTokenExpired(){
    const token = this.getToken();
    if(!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if (isTokenExpired) this.logout();
    return isTokenExpired;
  }

  logout = (): void => {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  };

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey) || '';
  } 

}
