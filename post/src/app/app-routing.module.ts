import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./sign-up/sign-up.module").then((m) => m.SignUpModule)
  }
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
