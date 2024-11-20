import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in'
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
  }
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
