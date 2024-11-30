import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User | null = null;
  constructor(private userService: UserService, private router: Router) {
  }

  logout() {
    this.router.navigate(['/sign-in']);
    localStorage.removeItem('auth-token');
  }

  ngOnInit() {
    this.userService.getUser().subscribe((user: User) => this.user = user );
  }
}
