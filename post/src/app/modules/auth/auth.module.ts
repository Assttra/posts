import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from "@angular/router";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  }
];

@NgModule({
  declarations: [
    AuthComponent,
    SignUpComponent,
    SignInComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
    ]
})
export class AuthModule { }
