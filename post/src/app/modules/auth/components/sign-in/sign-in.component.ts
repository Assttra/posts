import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";




@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent  {

  form!: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

    this.form = this.formBuilder.group( {
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(7)]]
    });
  }

  onSubmit(): void {
    this.authService.login(this.form.value).subscribe(() => this.router.navigate(['dashboard']));
  }




}
