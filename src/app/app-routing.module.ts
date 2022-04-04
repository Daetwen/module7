import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./guard/auth.guard";
import {CertificateCreateComponent} from "./certificatecreate/certificatecreate.component";
import {AdminGuard} from "./guard/admin.guard";
import {CertificateUpdateComponent} from "./certificateupdate/certificateupdate.component";
import {TagComponent} from "./tag/tag.component";
import {OrderComponent} from "./order/order.component";
import {UserComponent} from "./user/user.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'certificateCreate', component: CertificateCreateComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'certificateUpdate', component: CertificateUpdateComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'tags', component: TagComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
