import {Component} from '@angular/core';
import {UserService} from "../../shared/services/api/user-service/user.service";
import {User} from "../../shared/interfaces/user";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {

  user$: Observable<User | null> = this.userService.user$.asObservable();
  constructor(private readonly userService: UserService) {
  }


}
