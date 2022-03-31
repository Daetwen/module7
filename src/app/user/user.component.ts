import {Component, OnInit} from '@angular/core';
import {CertificateService} from "../service/giftcertificate.service";
import {User} from "../service/model/user";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']

})
export class UserComponent implements OnInit {

  PAGE_SIZE = 12;
  FIND_ALL_WITH_PAGE_PATH = "/users/get?page=";
  FIND_ONE_PATH = "/users/get/";

  collection: any[] = [];
  currentPage: number = 1;
  isAll: boolean = true;

  searchByIdForm = new FormGroup({
    id: new FormControl(""),
  })

  constructor(private certificate: CertificateService) {
  }

  ngOnInit(): void {
    this.currentPage = 1;
    this.getElementsForSearchAll();
  }

  getOne(event: Event) {
    event.preventDefault();
    if(this.searchId?.value != null && this.searchId?.value != "") {
      this.certificate.getData((this.FIND_ONE_PATH + this.searchId?.value))
        .subscribe((result) => {
          this.collection = [];
          this.collection[0] = result as unknown as User;
          console.log(this.collection[0]);
          this.searchByIdForm.reset();
          this.currentPage = 1;
        });
      this.isAll = false;
    }
  }

  returnToAll(event: Event) {
    event.preventDefault();
    this.currentPage = 1;
    this.getElementsForSearchAll();
    this.isAll = true;
  }

  prevPage(event: Event) {
    event.preventDefault();
    // @ts-ignore
    if (this.currentPage > 1) {
      // @ts-ignore
      this.currentPage -= 1;
      this.getElementsForSearchAll();
    }
  }

  nextPage(event: Event) {
    event.preventDefault();
    if (this.collection.length == this.PAGE_SIZE) {
      // @ts-ignore
      this.currentPage += 1;
      this.getElementsForSearchAll();
    }
  }

  getElementsForSearchAll() {
    this.certificate.getAll(this.FIND_ALL_WITH_PAGE_PATH + this.currentPage)
      .subscribe((result) => {
      this.collection = result as unknown as User[];
      console.log(this.collection);
    });
  }

  get searchId() { return this.searchByIdForm.get("id"); }
}
