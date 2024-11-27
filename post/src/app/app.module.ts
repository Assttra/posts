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

@NgModule({
  declarations: [
    AppComponent,
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
