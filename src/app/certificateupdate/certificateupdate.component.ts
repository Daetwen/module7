import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {CertificateService} from "../service/giftcertificate.service";

@Component({
  selector: 'app-certificateupdate',
  templateUrl: './certificateupdate.component.html',
  styleUrls: ['./certificateupdate.component.css']
})
export class CertificateUpdateComponent implements OnInit {

  CERTIFICATE_UPDATE_PATH = "/certificates/update";

  namePattern = "[\\w !?,.]{0,45}";
  descriptionPattern = "[\\w ,.!?\\-\\d]{0,1000}";

  updateForm = new FormGroup({
    id: new FormControl("", Validators.required),
    name: new FormControl(""),
    description: new FormControl(""),
    price: new FormControl(""),
    duration: new FormControl("")
  })

  body = Object();
  response = Object();
  isIdInvalid: boolean = false;
  isNameInvalid: boolean = false;
  isDescriptionInvalid: boolean = false;
  isPriceInvalid: boolean = false;
  isDurationInvalid: boolean = false;

  constructor(private certificate: CertificateService) {}

  ngOnInit(): void {}

  submit(event: Event) {
    event.preventDefault();
    this.body = {};
    if(this.canUpdate()) {
      this.addParametersInBody();
      this.certificate.patchData(this.CERTIFICATE_UPDATE_PATH, this.body)
        .subscribe((result) => {
        this.response = result;
        console.log(this.response)
      });
      this.updateForm.reset();
    } else {
      this.isIdValid();
      this.isNameValid();
      this.isDescriptionValid();
      this.isPriceValid();
      this.isDurationValid();
    }
  }

  canUpdate() {
    return !Validators.required(<AbstractControl>this.id)
      // @ts-ignore
      && !this.id.invalid
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
    this.body.id = this.id.value;
    if (this.name?.value != "" && this.name?.value != null) {
      // @ts-ignore
      this.body.name = this.name.value;
    }
    if (this.description?.value != "" && this.description?.value != null) {
      // @ts-ignore
      this.body.description = this.description.value;
    }
    // @ts-ignore
    this.body.price = this.price.value == '' ? null: this.price.value;
    // @ts-ignore
    this.body.duration = this.duration.value == '' ? null: this.duration.value;
    console.log(this.body);
  }

  isIdValid() {
    // @ts-ignore
    if(this.id.invalid) {
      this.isIdInvalid = true;
    }
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

  idChange() {
    this.isIdInvalid = false;
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

  get id() { return this.updateForm.get("id"); }
  get name() { return this.updateForm.get("name"); }
  get description() { return this.updateForm.get("description"); }
  get price() { return this.updateForm.get("price"); }
  get duration() { return this.updateForm.get("duration"); }
}
