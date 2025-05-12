import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import { HeaderComponent } from './components/header/header.component';
import { TimerComponent } from './components/header/timer/timer.component';




@NgModule({
  declarations: [
    PostComponent,
    HeaderComponent,
    TimerComponent,
  ],
  exports: [
    PostComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink
  ]
})
export class SharedModule { }
