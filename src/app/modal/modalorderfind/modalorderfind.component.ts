import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modalorderfind',
  templateUrl: './modalorderfind.component.html',
  styleUrls: ['./modalorderfind.component.css']
})
export class ModalOrderFindComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalOrderFindComponent>) { }

  ngOnInit() {}

  closeModal() {
    this.dialogRef.close();
  }

}
