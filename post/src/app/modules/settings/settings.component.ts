import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/api/user-service/user.service";
import {User} from "../../shared/interfaces/user";
import {Router} from "@angular/router";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  form: FormGroup = this.formBuilder.group( {
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.required, Validators.pattern(/^\+38?\d{11}$/)]],
    address: [null, [Validators.required]]
  });

  user!: User;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  onSubmit(): void {
      this.userService.editUser(this.form.value).subscribe();
      this.router.navigate(['dashboard']);
  }

  ngOnInit(): void {
   this.userService.getUser().subscribe(user => {
     this.form.patchValue(user);
   });
  }

}
