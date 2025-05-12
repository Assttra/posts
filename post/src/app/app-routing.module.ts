import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {authGuard} from "./core/guards/auth.guard";


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
  },
  {
    path: 'settings',
    loadChildren: () => import('./modules/settings/settings.module').then((m) => m.SettingsModule),
    canActivate: [authGuard]
  },
  {
    path: 'user-list',
    loadChildren: () => import('./modules/user-list/user-list.module').then((m) => m.UserListModule),
    canActivate: [authGuard]
  },
  {
    path: 'create-post',
    loadChildren: () => import('./modules/create-post/create-post.module').then((m) => m.CreatePostModule),
    canActivate: [authGuard]
  },
  {
    path: 'create-post/:id',
    loadChildren: () => import('./modules/create-post/create-post.module').then((m) => m.CreatePostModule),
    canActivate: [authGuard]
  },
  {
    path: 'posts',
    loadChildren: () => import('./modules/posts/posts.module').then((m) => m.PostsModule),
    canActivate: [authGuard]
  },
  {
    path: 'post-page/:id',
    loadChildren: () => import('./modules/post-page/post-page.module').then((m) => m.PostPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'user-profile/:id',
    loadChildren: () => import('./modules/user-profile/user-profile.module').then((m) => m.UserProfileModule),
    canActivate: [authGuard],
  },
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
