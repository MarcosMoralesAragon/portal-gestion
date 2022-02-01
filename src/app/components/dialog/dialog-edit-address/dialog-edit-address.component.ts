import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {

  addressEditing! : Address

  constructor(public dialogRef: MatDialogRef<Address>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.addressEditing = this.data
    console.log(this.addressEditing)
  }

  edit(){
    this.dialogRef.close({
      result: "edit",
      data: this.addressEditing
    })
  }

  cancel(){
    this.dialogRef.close({
      result: "cancel"
    })
  }
}
