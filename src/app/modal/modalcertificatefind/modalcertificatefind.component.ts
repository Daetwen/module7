import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modalcertificatefind',
  templateUrl: './modalcertificatefind.component.html',
  styleUrls: ['./modalcertificatefind.component.css']
})
export class ModalCertificateFindComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalCertificateFindComponent>) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }
}
