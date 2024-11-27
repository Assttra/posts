import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";




@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.formBuilder.group( {
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(7)]]
    });
  };

  onSubmit(): void {
    this.authService.register(this.form.value).subscribe(() => this.router.navigate(['dashboard']));
  }
}
