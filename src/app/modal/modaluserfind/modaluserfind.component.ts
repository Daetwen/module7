import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modaluserfind',
  templateUrl: './modaluserfind.component.html',
  styleUrls: ['./modaluserfind.component.css']
})
export class ModalUserFindComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalUserFindComponent>) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }
}
