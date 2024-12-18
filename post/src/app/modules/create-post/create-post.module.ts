import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CreatePostComponent} from "./create-post.component";


const routes: Routes = [
  {
    path: '',
    component: CreatePostComponent
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CreatePostModule { }
