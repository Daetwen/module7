import {Component, OnInit} from '@angular/core';
import {CertificateService} from "../service/giftcertificate.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Tag} from "../service/model/tag";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalTagFindComponent} from "../modal/modaltagfind/modaltagfind.component";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  PAGE_SIZE = 20;
  CREATE_PATH = "/tags/create";
  DELETE_PATH = "/tags/delete/";
  FIND_ALL_WITH_PAGE_PATH = "/tags/get?page=";
  FIND_MOST_POPULAR_PATH = "/tags/get/tag_most_popular";
  FIND_ONE_PATH = "/tags/get/tag?";
  FIND_ONE_PARAMETER_NAME = "name=";
  FIND_ONE_PARAMETER_ID = "id=";
  LOCAL_STORAGE_KEY_ROLE = "role";
  ROLE_ADMIN = "ADMIN";

  namePattern = "[\\w !?,.]{0,45}";

  collection: any[] = [];
  currentPage: number = 1;
  isAdmin: boolean = false;
  isUser: boolean = true;
  isAll: boolean = true;
  body = Object({
    name: null
  })
  response = Object();

  searchForm = new FormGroup({
    id: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required)
  })

  createForm = new FormGroup({
    name: new FormControl("", Validators.required)
  })

  deleteForm = new FormGroup({
    id: new FormControl("")
  })

  constructor(private certificate: CertificateService, public matDialog: MatDialog) {
  }

  ngOnInit(): void {
    if (localStorage.getItem(this.LOCAL_STORAGE_KEY_ROLE) == this.ROLE_ADMIN) {
      this.isAdmin = true;
      this.isUser = false;
    }
    this.currentPage = 1;
    this.getElementsForSearchAll();
  }

  createElement(event: Event) {
    event.preventDefault();
    // @ts-ignore
    this.body.name = this.createName.value;
    this.certificate.postData(this.CREATE_PATH, this.body).subscribe((result) => {
      this.response = result;
      console.log(this.response)
    });
    this.createForm.reset();
  }

  deleteElement(event: Event) {
    event.preventDefault();
    this.certificate.deleteData(this.DELETE_PATH + this.deleteId?.value)
      .subscribe((result) => {
      this.response = result;
      console.log(this.response)
    }, () => this.errorFindHandler());
    this.deleteForm.reset();
  }

  findOne(event: Event) {
    event.preventDefault();
    this.certificate.getData(this.createQueryForSearchOne())
      .subscribe(result => {
        this.collection = [];
        this.collection[0] = result as unknown as Tag;
        console.log(this.collection[0]);
        this.currentPage = 1;
        this.isAll = false;
      }, () => this.errorFindHandler());
    this.searchForm.reset();
  }

  createQueryForSearchOne():string {
    let queryByParameters = this.FIND_ONE_PATH;
    if (this.searchName?.value != null && this.searchName?.value != "" && this.searchName?.valid) {
      queryByParameters = queryByParameters + this.FIND_ONE_PARAMETER_NAME + this.searchName.value + "&";
    }
    if (this.searchId?.value != null && this.searchId?.value != "" && this.searchId?.valid) {
      queryByParameters = queryByParameters + this.FIND_ONE_PARAMETER_ID + this.searchId.value;
    }
    console.log(queryByParameters.toString());
    return queryByParameters;
  }

  findMostPopular(event: Event) {
    event.preventDefault();
    this.certificate.getData((this.FIND_MOST_POPULAR_PATH))
      .subscribe((result) => {
        this.collection = [];
        this.collection[0] = result as unknown as Tag;
        console.log(this.collection[0]);
        this.currentPage = 1;
      });
    this.isAll = false;
  }

  returnToAll(event: Event) {
    event.preventDefault();
    this.currentPage = 1;
    this.getElementsForSearchAll();
    this.isAll = true;
  }

  prevPage(event: Event) {
    event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.getElementsForSearchAll();
    }
  }

  nextPage(event: Event) {
    event.preventDefault();
    if (this.collection.length == this.PAGE_SIZE) {
      this.currentPage += 1;
      this.getElementsForSearchAll();
    }
  }

  getElementsForSearchAll() {
    this.certificate.getAll(this.FIND_ALL_WITH_PAGE_PATH + this.currentPage)
      .subscribe((result) => {
        this.collection = result as unknown as Tag[];
        console.log(this.collection);
      });
  }

  errorFindHandler() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "modal-component";
    this.matDialog.open(ModalTagFindComponent, dialogConfig);
  }

  get searchId() { return this.searchForm.get("id"); }
  get searchName() { return this.searchForm.get("name"); }
  get createName() { return this.createForm.get("name"); }
  get deleteId() { return this.deleteForm.get("id"); }
}
