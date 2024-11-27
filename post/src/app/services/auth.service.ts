import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RegisterData } from "../interfaces/auth.interface";
import { LoginData } from "../interfaces/auth.interface";
import {Observable, tap} from "rxjs";
import {env} from "../../environments/env";


@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private token: string | null = null;

  constructor(private http: HttpClient) { }


  register(data: RegisterData): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${env.baseUrl}/api/sign-up`, data)
      .pipe(
        tap (
          ({token}) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
          }
        )
      )
  };
  login(data: LoginData): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${env.baseUrl}/api/sign-in`, data)
      .pipe(
        tap (
          ({token}) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
          }
        )
      )
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }


}



