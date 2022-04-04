import { Component, OnInit } from '@angular/core';
import {User} from "../service/model/user";
import {CertificateService} from "../service/giftcertificate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  FIND_BY_USER_ID_PATH = "/users/get/";
  NAVIGATE_LOGIN_PATH = "/users/login";
  LOCAL_STORAGE_KEY_USER_ID = "userId";
  LOCAL_STORAGE_KEY_ROLE = "role";
  LOCAL_STORAGE_KEY_TOKEN = "token";

  user: User | undefined;

  constructor(private certificate: CertificateService, private router: Router) {
  }

  ngOnInit(): void {
     if (localStorage.getItem(this.LOCAL_STORAGE_KEY_TOKEN) != null) {
       if(this.tokenExpired()) {

       }
     } else {
       this.router.navigate([this.NAVIGATE_LOGIN_PATH]).then(() => {});
     }
  }

  ngAfterContentInit(): void {
    this.getUserInfo();
  }

  private tokenExpired() {
    const token = localStorage.getItem(this.LOCAL_STORAGE_KEY_TOKEN);
    // @ts-ignore
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  getUserInfo(): void {
    this.certificate.getOne(this.FIND_BY_USER_ID_PATH + localStorage.getItem(this.LOCAL_STORAGE_KEY_USER_ID))
      .subscribe(result => {
        this.user = result as unknown as User;
        localStorage.setItem(this.LOCAL_STORAGE_KEY_ROLE, this.user.role);
        console.log(this.user);
      });
  }

  logout(event: Event) {
    event.preventDefault();
    this.router.navigate([this.NAVIGATE_LOGIN_PATH]).then(() => {});
  }

}
