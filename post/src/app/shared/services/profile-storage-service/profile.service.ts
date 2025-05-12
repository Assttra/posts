import { Injectable } from '@angular/core';
import {UserDetails} from "../../interfaces/user-details";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  setItem(key: string, data: UserDetails): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getItem(key: string): UserDetails | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  clear(): void {
    localStorage.clear();
  }
}
