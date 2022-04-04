import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {CertificateService} from "../service/giftcertificate.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LOGIN_PATH = "/users/login";
  NAVIGATE_PROFILE_PATH = "/profile";
  LOCAL_STORAGE_KEY_USER_ID = "userId";
  LOCAL_STORAGE_KEY_LOGIN = "login";
  LOCAL_STORAGE_KEY_TOKEN = "token";

  loginPattern = "[\\w !?,.]{0,45}";
  passwordPattern = "[\\w_!?#]{0,45}";

  loginForm = new FormGroup({
    login: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  isLoginInvalid: boolean = false;
  isPasswordInvalid: boolean = false;

  body = Object({
    login: null,
    password: null
  })

  response = Object();
  tokenPayload= Object({
    sub: "",
    jti: "",
    exp: 0
  })
  expirationDate: any;

  constructor(private certificate: CertificateService,
              private router: Router,
              private jwtHelper :JwtHelperService) { }

  ngOnInit(): void {
    localStorage.clear();
    console.log(localStorage);
  }

  loginEvent(event: Event) {
    event.preventDefault();
    if(this.canSubmit()) {
      this.collectBody();
      this.certificate.postData(this.LOGIN_PATH, this.body).subscribe(result => {
         this.response = result;
         console.log(this.response);
        this.tokenDecoded(this.response.token);
        localStorage.setItem(this.LOCAL_STORAGE_KEY_USER_ID, this.tokenPayload.jti);
        localStorage.setItem(this.LOCAL_STORAGE_KEY_LOGIN, this.tokenPayload.sub);
        localStorage.setItem(this.LOCAL_STORAGE_KEY_TOKEN, this.response.token);
        console.log(localStorage);
        this.loginForm.reset();
        this.router.navigate([this.NAVIGATE_PROFILE_PATH]).then(() => {});
      });
    }
    else {
      this.activateInvalidFields();
    }
  }

  canSubmit() {
    return !Validators.required(<AbstractControl>this.login)
      && !Validators.required(<AbstractControl>this.password)
      // @ts-ignore
      && !this.login.invalid
      // @ts-ignore
      && !this.password.invalid;
  }

  collectBody() {
    // @ts-ignore
    this.body.login = this.login.value;
    // @ts-ignore
    this.body.password = this.password.value;
    console.log(this.body)
  }

  activateInvalidFields() {
    // @ts-ignore
    if(this.login.invalid) {
      this.isLoginInvalid = true;
    }
    // @ts-ignore
    if(this.password.invalid) {
      this.isPasswordInvalid = true;
    }
  }

  loginChange() {
    this.isLoginInvalid = false;
  }
  passwordChange() {
    this.isPasswordInvalid = false;
  }

  tokenDecoded(token: string) {
    this.tokenPayload = this.jwtHelper.decodeToken(token);
  }

  get login() { return this.loginForm.get("login"); }
  get password() { return this.loginForm.get("password"); }
}
