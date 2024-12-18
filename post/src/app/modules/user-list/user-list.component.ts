import {Component, DestroyRef} from '@angular/core';
import {UserService} from "../../shared/services/api/user-service/user.service";
import {User} from "../../shared/interfaces/user";
import {Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  users$: Observable<User[]> = this.userService.getUsers();
  getUser!: User;
  getUserId!: number;
  constructor(private userService: UserService, private destroyRef: DestroyRef) {
  }

  getUserById(userId: number): void {
    this.getUserId = userId;
    this.userService.getUserById(userId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe( user => {
      this.getUser = user;
    });
  }



}
