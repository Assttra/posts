import {Component, OnInit} from '@angular/core';
import {User} from "./shared/interfaces/user";
import {UserService} from "./shared/services/api/user-service/user.service";
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
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
