import { Component, OnInit } from '@angular/core';
import {Order} from "../service/model/order";
import {CertificateService} from "../service/giftcertificate.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalOrderFindComponent} from "../modal/modalorderfind/modalorderfind.component";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  PAGE_SIZE = 8;
  FIND_ALL_WITH_PAGE_PATH = "/orders/get?page=";
  FIND_BY_ORDER_ID_PATH = "/orders/get/";
  FIND_BY_ORDER_ID_FOR_USER_PATH = "/orders/get/personal?orderId=";
  FIND_BY_ORDER_ID_FOR_USER_USER_PARAMETER = "&userId=";
  FIND_BY_USER_ID_PATH = "/orders/get/user/";
  LOCAL_STORAGE_KEY_FIND_BY_USER_ID = "findByUserId";
  LOCAL_STORAGE_KEY_USER_ID = "userId";
  LOCAL_STORAGE_KEY_ROLE = "role";
  ROLE_ADMIN = "ADMIN";

  collection: any[] = [];
  error: any;
  currentPage: number = 1;
  isAdmin: boolean = false;
  isUser: boolean = true;
  isAll: boolean = true;

  searchByOrderIdForm = new FormGroup({
    id: new FormControl(""),
  })

  searchByUserIdForm = new FormGroup({
    id: new FormControl(""),
  })

  constructor(private certificate: CertificateService, public matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.currentPage = 1;
    if (localStorage.getItem(this.LOCAL_STORAGE_KEY_ROLE) == this.ROLE_ADMIN) {
      this.isAdmin = true;
      this.isUser = false;
    }
    if (this.isUser) {
      const queryString = this.FIND_BY_USER_ID_PATH
        + localStorage.getItem(this.LOCAL_STORAGE_KEY_USER_ID);
      localStorage.setItem(this.LOCAL_STORAGE_KEY_FIND_BY_USER_ID, queryString);
      this.getElementsForSearchByUserId();
    } else {
      this.getElementsForSearchAll();
    }
  }

  getByOrderId(event: Event) {
    event.preventDefault();
    if(this.searchOrderId?.value != null && this.searchOrderId?.value != "") {
      if (this.isAdmin) {
        let query = this.FIND_BY_ORDER_ID_PATH + this.searchOrderId?.value;
        this.getElementById(query);
      } else {
        let query = this.FIND_BY_ORDER_ID_FOR_USER_PATH
          + this.searchOrderId?.value
          + this.FIND_BY_ORDER_ID_FOR_USER_USER_PARAMETER
          + localStorage.getItem(this.LOCAL_STORAGE_KEY_USER_ID);
        this.getElementById(query);
      }
    }
    this.searchByOrderIdForm.reset();
  }

  getByUserId(event: Event) {
    event.preventDefault();
    if(this.searchUserId?.value != null && this.searchUserId?.value != "") {
      const queryString = this.FIND_BY_USER_ID_PATH + this.searchUserId?.value;
      localStorage.setItem(this.LOCAL_STORAGE_KEY_FIND_BY_USER_ID, queryString);
      this.getElementsForSearchByUserId();
    }
    this.searchByUserIdForm.reset();
  }

  returnToAll(event: Event) {
    event.preventDefault();
    this.currentPage = 1;
    if (this.isAdmin) {
      if (localStorage.getItem(this.LOCAL_STORAGE_KEY_FIND_BY_USER_ID) != null) {
        localStorage.removeItem(this.LOCAL_STORAGE_KEY_FIND_BY_USER_ID);
      }
      this.getElementsForSearchAll();
    } else {
      this.getElementsForSearchByUserId();
    }
    this.isAll = true;
  }

  prevPage(event: Event) {
    event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      if (localStorage.getItem(this.LOCAL_STORAGE_KEY_FIND_BY_USER_ID) != null) {
        this.getElementsForSearchByUserId();
      } else {
        this.getElementsForSearchAll();
      }
    }
  }

  nextPage(event: Event) {
    event.preventDefault();
      if (this.collection.length == this.PAGE_SIZE) {
        this.currentPage += 1;
        if (localStorage.getItem(this.LOCAL_STORAGE_KEY_FIND_BY_USER_ID) != null) {
          this.getElementsForSearchByUserId();
        } else {
          this.getElementsForSearchAll();
        }
      }
  }

  getElementsForSearchByUserId() {
    const queryString = localStorage.getItem(this.LOCAL_STORAGE_KEY_FIND_BY_USER_ID)
      + "?page="
      + this.currentPage;
    this.certificate.getAll((queryString))
      .subscribe((result) => {
        if ((result as unknown as Order[]).length != 0) {
          this.collection = result as unknown as Order[];
          console.log(this.collection);
          this.currentPage = 1;
          this.isAll = false;
        } else {
          this.errorFindHandler();
        }
      });
  }

  getElementsForSearchAll() {
    this.certificate.getAll(this.FIND_ALL_WITH_PAGE_PATH + this.currentPage)
      .subscribe((result) => {
        this.collection = result as unknown as Order[];
        console.log(this.collection);
      });
  }

  getElementById(query:string) {
    this.certificate.getData(query)
      .subscribe((result) => {
        this.collection = [];
        this.collection[0] = result as unknown as Order;
        console.log(this.collection[0]);
        this.currentPage = 1;
        this.isAll = false;
      }, () => this.errorFindHandler());
  }

  errorFindHandler() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "modal-component";
    this.matDialog.open(ModalOrderFindComponent, dialogConfig);
  }

  get searchOrderId() { return this.searchByOrderIdForm.get("id"); }

  get searchUserId() { return this.searchByUserIdForm.get("id"); }
}
