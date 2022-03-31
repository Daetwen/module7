import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modalordercreate.component.html',
  styleUrls: ['./modalordercreate.component.css']
})

export class ModalOrderCreateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalOrderCreateComponent>) { }

  ngOnInit() {}

  closeModal() {
    this.dialogRef.close();
  }

}
