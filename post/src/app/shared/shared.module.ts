import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    PostComponent
  ],
  exports: [
    PostComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class SharedModule { }
