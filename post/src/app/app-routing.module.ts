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
  },
  {
    path: 'settings',
    loadChildren: () => import('./modules/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'user-list',
    loadChildren: () => import('./modules/user-list/user-list.module').then((m) => m.UserListModule),
  },
  {
    path: 'create-post',
    loadChildren: () => import('./modules/create-post/create-post.module').then((m) => m.CreatePostModule),
  },
  {
    path: 'posts',
    loadChildren: () => import('./modules/posts/posts.module').then((m) => m.PostsModule)
  }
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
