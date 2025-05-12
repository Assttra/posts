import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import {RouterModule, Routes} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import { UserDetailsComponent } from './user-details/user-details.component';
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import { AvatarModalComponent } from './avatar-modal/avatar-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AvatarPreviewComponent } from './avatar-preview/avatar-preview.component';


const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent
  },
]
@NgModule({
  declarations: [
    UserProfileComponent,
    UserDetailsComponent,
    AvatarModalComponent,
    AvatarPreviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class UserProfileModule { }
