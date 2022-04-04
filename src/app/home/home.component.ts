import { Component, OnInit } from '@angular/core';
import {CertificateService} from "../service/giftcertificate.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Certificate} from "../service/model/certificate";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalOrderCreateComponent} from "../modal/modalordercreate/modalordercreate.component";
import {ModalCertificateFindComponent} from "../modal/modalcertificatefind/modalcertificatefind.component";
import {ContentList} from "../service/model/interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  PAGE_SIZE = 8;
  CERTIFICATE_CREATE_PATH = "/orders/create?userId=";
  CERTIFICATE_CREATE_PARAMETER_CERTIFICATE_ID = "&certificateId=";
  CERTIFICATE_DELETE_PATH = "/certificates/delete/";
  FIND_ALL_CERTIFICATES_WITH_PAGE_PATH = "/certificates/get?page=";
  FIND_ONE_CERTIFICATE_PATH = "/certificates/get/";
  FIND_CERTIFICATES_BY_PARAMETERS_PATH = "/certificates/get/certificate_parameters?";
  FIND_CERTIFICATES_BY_PARAMETERS_PARAMETER_TAG_NAME = "tagName=";
  FIND_CERTIFICATES_BY_PARAMETERS_PARAMETER_PART = "part=";
  FIND_CERTIFICATES_BY_PARAMETERS_PARAMETER_SORT = "sort=";
  LOCAL_STORAGE_KEY_FIND_BY_PARAMETERS = "findByParameters";
  LOCAL_STORAGE_KEY_USER_ID = "userId";
  LOCAL_STORAGE_KEY_ROLE = "role";
  ROLE_ADMIN = "ADMIN";

  namePattern = "[\\w !?,.]{0,45}";

  collection: any[] = [];
  currentPage: number = 1;
  isAdmin: boolean = false;
  isUser: boolean = true;
  isAll: boolean = true;
  response = Object();

  searchByParametersForm = new FormGroup({
    tagName: new FormControl(""),
    part: new FormControl(""),
    sort: new FormControl("")
  })

  searchByIdForm = new FormGroup({
    id: new FormControl("")
  })

  deleteForm = new FormGroup({
    id: new FormControl("")
  })

  constructor(private certificate: CertificateService,
              public matDialog: MatDialog) {}

  ngOnInit(): void {
    if (localStorage.getItem(this.LOCAL_STORAGE_KEY_ROLE) == this.ROLE_ADMIN) {
      this.isAdmin = true;
      this.isUser = false;
    }
    if (localStorage.getItem(this.LOCAL_STORAGE_KEY_FIND_BY_PARAMETERS) != null) {
      localStorage.removeItem(this.LOCAL_STORAGE_KEY_FIND_BY_PARAMETERS);
    }
    this.currentPage = 1;
    this.getElementsForSearchAll();
  }

  getByParameters(event: Event) {
    event.preventDefault();
    if (this.searchTagName?.valid && this.searchPart?.valid) {
      let queryByParameters = this.FIND_CERTIFICATES_BY_PARAMETERS_PATH;
      queryByParameters = this.addParametersForSearch(queryByParameters);
      console.log(queryByParameters.toString());
      localStorage.setItem(this.LOCAL_STORAGE_KEY_FIND_BY_PARAMETERS, queryByParameters);
      this.certificate.getAll(queryByParameters.toString())
        .subscribe((result) => {
          this.isFindByParametersMoreThenZero(result);
        });
    }
    this.searchByParametersForm.reset();
  }

  getById(event: Event) {
    event.preventDefault();
    if(this.searchCertificateId?.value != null && this.searchCertificateId?.value != "") {
      this.certificate.getData((this.FIND_ONE_CERTIFICATE_PATH + this.searchCertificateId?.value))
        .subscribe((result) => {
          this.collection = [];
          this.collection[0] = result as unknown as Certificate;
          console.log(this.collection);
          this.currentPage = 1;
          this.isAll = false;
        }, () => this.errorFindHandler());
    }
    this.searchByIdForm.reset();
  }

  returnToAll(event: Event) {
    event.preventDefault();
    this.currentPage = 1;
    if (localStorage.getItem(this.LOCAL_STORAGE_KEY_FIND_BY_PARAMETERS) != null) {
      localStorage.removeItem(this.LOCAL_STORAGE_KEY_FIND_BY_PARAMETERS);
    }
    this.getElementsForSearchAll();
    this.isAll = true;
  }

  deleteElement(event: Event) {
    event.preventDefault();
    if (this.deleteId?.valid) {
      this.certificate.deleteData(this.CERTIFICATE_DELETE_PATH + this.deleteId?.value)
        .subscribe((result) => {
          this.response = result;
          console.log(this.response)
        }, () => this.errorFindHandler());
    }
    this.deleteForm.reset();
  }

  createOrder(event: Event, id: number) {
    event.preventDefault();
    let query = this.CERTIFICATE_CREATE_PATH
      + localStorage.getItem(this.LOCAL_STORAGE_KEY_USER_ID)
      + this.CERTIFICATE_CREATE_PARAMETER_CERTIFICATE_ID
      + id;
    console.log(query);
    this.addModalToCreate();
    // @ts-ignore
    this.certificate.postData(query).subscribe((result) => {
      this.response = result;
      console.log(this.response)
    });
  }

  prevPage(event: Event) {
    event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      if (localStorage.getItem(this.LOCAL_STORAGE_KEY_FIND_BY_PARAMETERS) != null) {
        this.getElementsForSearchByParameters();
      } else {
        this.getElementsForSearchAll();
      }
    }
  }

  nextPage(event: Event) {
    event.preventDefault();
    if (this.collection.length == this.PAGE_SIZE) {
      this.currentPage += 1;
      if (localStorage.getItem(this.LOCAL_STORAGE_KEY_FIND_BY_PARAMETERS) != null) {
        this.getElementsForSearchByParameters();
      } else {
        this.getElementsForSearchAll();
      }
    }
  }

  addParametersForSearch(queryByParameters: string): string {
    if (this.searchTagName?.value != null && this.searchTagName?.value != "") {
      queryByParameters = queryByParameters
        + this.FIND_CERTIFICATES_BY_PARAMETERS_PARAMETER_TAG_NAME
        + this.searchTagName.value + "&";
    }
    if (this.searchPart?.value != null && this.searchPart?.value != "") {
      queryByParameters = queryByParameters
        + this.FIND_CERTIFICATES_BY_PARAMETERS_PARAMETER_PART
        + this.searchPart.value + "&";
    }
    if (this.searchSort?.value != null && this.searchSort?.value != "") {
      queryByParameters = queryByParameters
        + this.FIND_CERTIFICATES_BY_PARAMETERS_PARAMETER_SORT
        + this.searchSort.value;
    }
    return queryByParameters;
  }

  getElementsForSearchByParameters() {
    const queryByParameters = localStorage.getItem(this.LOCAL_STORAGE_KEY_FIND_BY_PARAMETERS)
      + "&page="
      + this.currentPage;
    this.certificate.getAll(queryByParameters.toString()).subscribe((result) => {
      this.collection = result as unknown as Certificate[];
      console.log(this.collection);
    });
  }

  getElementsForSearchAll() {
    this.certificate.getAll(this.FIND_ALL_CERTIFICATES_WITH_PAGE_PATH + this.currentPage)
      .subscribe((result) => {
      this.collection = result as unknown as Certificate[];
      console.log(this.collection);
    });
  }

  errorFindHandler() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "modal-component";
    this.matDialog.open(ModalCertificateFindComponent, dialogConfig);
  }

  isFindByParametersMoreThenZero(result: ContentList<unknown>) {
    if ((result as unknown as Certificate[]).length != 0) {
      this.collection = result as unknown as Certificate[];
      console.log(this.collection);
      this.currentPage = 1;
      this.isAll = false;
    } else {
      this.errorFindHandler();
    }
  }

  addModalToCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "modal-component";
    this.matDialog.open(ModalOrderCreateComponent, dialogConfig);
  }

  get searchTagName() {return this.searchByParametersForm.get("tagName");}
  get searchPart() {return this.searchByParametersForm.get("part");}
  get searchSort() {return this.searchByParametersForm.get("sort");}
  get searchCertificateId() {return this.searchByIdForm.get("id");}
  get deleteId() { return this.deleteForm.get("id"); }
}
