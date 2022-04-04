import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import {AppComponent} from './app.component';
import {HomeComponent} from "./home/home.component";
import {UserComponent} from "./user/user.component";
import {ProfileComponent} from "./profile/profile.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {TagComponent} from "./tag/tag.component";
import {OrderComponent} from "./order/order.component";
import {CertificateCreateComponent} from "./certificatecreate/certificatecreate.component";
import {CertificateUpdateComponent} from "./certificateupdate/certificateupdate.component";
import {CertificateService} from "./service/giftcertificate.service";
import {AuthInterceptor} from "./service/token/auth.interceptor";
import { ModalOrderCreateComponent } from './modal/modalordercreate/modalordercreate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthGuard} from "./guard/auth.guard";
import {AdminGuard} from "./guard/admin.guard";
import { PricePipe } from './pipe/price.pipe';
import {AppRoutingModule} from "./app-routing.module";
import { ModalOrderFindComponent } from './modal/modalorderfind/modalorderfind.component';
import { ModalUserFindComponent } from './modal/modaluserfind/modaluserfind.component';
import { ModalTagFindComponent } from './modal/modaltagfind/modaltagfind.component';
import { ModalCertificateFindComponent } from './modal/modalcertificatefind/modalcertificatefind.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TagComponent,
    OrderComponent,
    UserComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    CertificateCreateComponent,
    CertificateUpdateComponent,
    ModalOrderCreateComponent,
    PricePipe,
    ModalOrderFindComponent,
    ModalUserFindComponent,
    ModalTagFindComponent,
    ModalCertificateFindComponent
  ],
  imports: [FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AppRoutingModule],
  providers: [CertificateService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    JwtHelperService,
    AuthGuard,
    AdminGuard],
  bootstrap: [AppComponent],
  entryComponents: [ModalOrderCreateComponent, ModalOrderFindComponent]

})
export class AppModule { }
