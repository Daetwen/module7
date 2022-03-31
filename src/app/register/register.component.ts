import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {CertificateService} from "../service/giftcertificate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  REGISTER_PATH = "/users/register";
  NAVIGATE_LOGIN_PATH = "/login";
  CREATE_ROLE_USER = "USER";

  namePattern = "[\\w !?,.]{0,45}";
  loginPattern = "[\\w !?,.]{0,45}";
  passwordPattern = "[\\w_!?#]{0,45}";

  registerForm = new FormGroup({
    name: new FormControl("", Validators.required),
    surname: new FormControl("", Validators.required),
    login: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    password2: new FormControl("")
  })

  isNameInvalid: boolean = false;
  isSurnameInvalid: boolean = false;
  isLoginInvalid: boolean = false;
  isPasswordInvalid: boolean = false;
  isPassword2Invalid: boolean = false;

  body = Object({
    name: null,
    surname: null,
    login: null,
    password: null,
    role: null
  })

  response = Object();

  constructor(private certificate: CertificateService, private router: Router) { }

  ngOnInit(): void {
  }

  registerEvent(event: Event) {
    event.preventDefault();
    if (this.canRegister()) {
      // @ts-ignore
      this.body.name = this.name.value;
      // @ts-ignore
      this.body.surname = this.surname.value;
      // @ts-ignore
      this.body.login = this.login.value;
      // @ts-ignore
      this.body.password = this.password.value;
      this.body.role = this.CREATE_ROLE_USER;
      this.certificate.postData(this.REGISTER_PATH, this.body).subscribe(result => {
        console.log(result);
        this.router.navigate([this.NAVIGATE_LOGIN_PATH]).then(() => {});
      })
    } else {
      // @ts-ignore
      if(this.name.invalid) {
        this.isLoginInvalid = true;
      }
      // @ts-ignore
      if(this.surname.invalid) {
        this.isPasswordInvalid = true;
      }
      // @ts-ignore
      if(this.login.invalid) {
        this.isLoginInvalid = true;
      }
      // @ts-ignore
      if(this.password.invalid) {
        this.isPasswordInvalid = true;
      }
      // @ts-ignore
      if(this.passwordRepeat != this.password) {
        this.isPassword2Invalid = true;
      }
    }
  }

  canRegister() {
    return !Validators.required(<AbstractControl>this.name)
      &&!Validators.required(<AbstractControl>this.surname)
      &&!Validators.required(<AbstractControl>this.login)
      && !Validators.required(<AbstractControl>this.password)
      && !Validators.required(<AbstractControl>this.passwordRepeat)
      // @ts-ignore
      && !this.name.invalid
      // @ts-ignore
      && !this.surname.invalid
      // @ts-ignore
      && !this.login.invalid
      // @ts-ignore
      && !this.password.invalid
      // @ts-ignore
      && this.passwordRepeat == this.password;
  }

  nameChange() {
    this.isNameInvalid = false;
  }
  surnameChange() {
    this.isSurnameInvalid = false;
  }
  loginChange() {
    this.isLoginInvalid = false;
  }
  passwordChange() {
    this.isPasswordInvalid = false;
  }
  password2Change() {
    this.isPassword2Invalid = false;
  }

  get name() { return this.registerForm.get("name"); }
  get surname() { return this.registerForm.get("surname"); }
  get login() { return this.registerForm.get("login"); }
  get password() { return this.registerForm.get("password"); }
  get passwordRepeat() { return this.registerForm.get("password2"); }
}
