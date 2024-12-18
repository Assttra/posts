import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./interceptors/token-interceptor";
import { CreatePostComponent } from './modules/create-post/create-post.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import { PostsComponent } from './modules/posts/posts.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    PostsComponent,
  ],
    imports: [
        BrowserModule,
        RouterOutlet,
        CoreModule,
        SharedModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
