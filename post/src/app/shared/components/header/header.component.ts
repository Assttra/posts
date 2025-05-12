import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {UserService} from "../../services/api/user-service/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  title = 'post';
  user$ = this.userService.getUserData();
  user: User | null = null;
  constructor(public userService: UserService, private router: Router, private authService: AuthService) {
  }

  logout() {
    this.router.navigate(['/sign-in']);
    localStorage.removeItem('auth-token');
    this.userService.resetUser();
  }

  ngOnInit() {
    if (this.authService.getToken()) {
      this.userService.getUser().subscribe(user => this.user = user)
    }
  }
}
