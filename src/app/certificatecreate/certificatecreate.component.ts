import {Component, OnInit} from '@angular/core';
import {CertificateService} from "../service/giftcertificate.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-certificatecreate',
  templateUrl: './certificatecreate.component.html',
  styleUrls: ['./certificatecreate.component.css']
})
export class CertificateCreateComponent implements OnInit {

  CERTIFICATE_CREATE_PATH = "/certificates/create";

  namePattern = "[\\w !?,.]{0,45}";
  descriptionPattern = "[\\w ,.!?\\-\\d]{0,1000}";

  createForm = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl(""),
    price: new FormControl("", Validators.required),
    duration: new FormControl("", Validators.required)
  })

  body = Object();
  response = Object();
  isNameInvalid: boolean = false;
  isDescriptionInvalid: boolean = false;
  isPriceInvalid: boolean = false;
  isDurationInvalid: boolean = false;

  constructor(private certificate: CertificateService) {}

  ngOnInit(): void {}

  submit(event: Event) {
    event.preventDefault();
    this.body = {};
     if (this.canCreate()) {
       this.addParametersInBody()
       console.log(this.body);
       this.certificate.postData(this.CERTIFICATE_CREATE_PATH, this.body)
         .subscribe((result) => {
         this.response = result;
         console.log(this.response)
       });
       this.createForm.reset();
     } else {
       this.isNameValid();
       this.isDescriptionValid();
       this.isPriceValid();
       this.isDurationValid();
     }
  }

  canCreate() {
    return !Validators.required(<AbstractControl>this.name)
      && !Validators.required(<AbstractControl>this.price)
      && !Validators.required(<AbstractControl>this.duration)
      // @ts-ignore
      && !this.name.invalid
      // @ts-ignore
      && !this.description.invalid
      // @ts-ignore
      && !this.price.invalid
      // @ts-ignore
      && !this.duration.invalid
  }

  addParametersInBody() {
    // @ts-ignore
    this.body.name = this.name.value;
    if (this.description?.value != "" && this.description?.value != null) {
      // @ts-ignore
      this.body.description = this.description.value;
    }
    // @ts-ignore
    this.body.price = this.price.value;
    // @ts-ignore
    this.body.duration = this.duration.value;
  }

  isNameValid() {
    // @ts-ignore
    if(this.name.invalid) {
      this.isNameInvalid = true;
    }
  }
  isDescriptionValid() {
    // @ts-ignore
    if(this.description.invalid) {
      this.isDescriptionInvalid = true;
    }
  }
  isPriceValid() {
    // @ts-ignore
    if(this.price.invalid) {
      this.isPriceInvalid = true;
    }
  }
  isDurationValid() {
    // @ts-ignore
    if(this.duration.invalid) {
      this.isDurationInvalid = true;
    }
  }

  nameChange() {
    this.isNameInvalid = false;
  }
  descriptionChange() {
    this.isDescriptionInvalid = false;
  }
  priceChange() {
    this.isPriceInvalid = false;
  }
  durationChange() {
    this.isDurationInvalid = false;
  }

  get name() { return this.createForm.get("name"); }
  get description() { return this.createForm.get("description"); }
  get price() { return this.createForm.get("price"); }
  get duration() { return this.createForm.get("duration"); }
}
