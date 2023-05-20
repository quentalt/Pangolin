import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PangolinComponent} from "./pangolin/pangolin.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
const routes: Routes = [
  {
    path: 'home', component:PangolinComponent
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'register', component:RegisterComponent
  },
  {
    path: 'profile',component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
