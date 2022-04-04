import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modaltagfind',
  templateUrl: './modaltagfind.component.html',
  styleUrls: ['./modaltagfind.component.css']
})
export class ModalTagFindComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalTagFindComponent>) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }
}
