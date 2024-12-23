import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RegisterData } from "../interfaces/auth.interface";
import { LoginData } from "../interfaces/auth.interface";
import {Observable, switchMap, tap} from "rxjs";
import {env} from "../../environments/env";
import {UserTokenStorage} from "./class/user-token-storage";
import {User} from "../shared/interfaces/user";
import {UserService} from "../shared/services/api/user-service/user.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService extends UserTokenStorage {
  constructor(private http: HttpClient, private userService: UserService) {
    super()
  }

  register(data: RegisterData): Observable<User> {
    return this.http.post<{ token: string }>(`${env.baseUrl}/api/sign-up`, data)
      .pipe(
        switchMap(({ token }) => {
          this.setToken(token);
          return this.userService.getUser();
        }),
      )
  };
  login(data: LoginData): Observable<User> {
    return this.http.post<{ token: string }>(`${env.baseUrl}/api/sign-in`, data)
      .pipe(
        switchMap(({ token }) => {
          this.setToken(token);
          return this.userService.getUser();
        }),
      )
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

}



