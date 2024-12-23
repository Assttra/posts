import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {env} from "../../../../../environments/env";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../../../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  user$ = new BehaviorSubject<User | null>(null)
  constructor(private httpClient: HttpClient) { }

  getUser() :Observable<User> {
    return this.httpClient.get<User>(`${env.baseUrl}/api/user`).pipe(
      tap(data => {
        this.user$.next(data)
      })
    );
  }

  getUserData(): Observable<User | null> {
     return this.user$.asObservable();
  }

  resetUser(): void {
    this.user$.next(null);
  }

  editUser(user: User): Observable<User> {
    return this.httpClient.put<User>( `${env.baseUrl}/api/edit-user`, user);
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${env.baseUrl}/api/users`);
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${env.baseUrl}/api/user/${id}`)
  }

  isAdmin() {
    return this.user$.getValue()?.role.status === 'Admin';
  }

  isUser(postUserId: number) {
    return this.user$.getValue()?.id === postUserId;

  }


}
