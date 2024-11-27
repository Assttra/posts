import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {authGuard} from "./shared/сlasses/auth.guard";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in'
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [authGuard]
  }
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
