import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address/address.service';

@Component({
  selector: 'app-dialog-create-address',
  templateUrl: './dialog-create-address.component.html',
  styleUrls: ['./dialog-create-address.component.scss']
})
export class DialogCreateAddressComponent implements OnInit {

  addressCreating!: Address
  message : string = ""

  constructor(public dialogRef: MatDialogRef<Address>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public addressServices : AddressService) { }

  ngOnInit(): void {
    this.addressCreating = {
      id: this.addressServices.getAddressLenght() + 1,
      street: "",
      block: "",
      floor: "",
      door: "",
      postCode : 0,
      localty : "",
      province : "",
      idWorker : this.data
    }
  }

  checkInputs() : boolean{
    if ((this.addressCreating.street != "") &&
        (this.addressCreating.floor != "") &&
        (this.addressCreating.door != "") &&
        (this.addressCreating.postCode != 0) &&
        (this.addressCreating.localty != "") &&
        (this.addressCreating.province != "")) {
          return true
    } else {
      return false
    }
  }

  create(){
    if (this.checkInputs()) {
      console.log(this.addressCreating)
      this.dialogRef.close({
        result: "create",
        data: this.addressCreating
      }) 
    } else {
      this.message = "Rellene los campos porfavor"
    }
  }

  cancel(){
    this.dialogRef.close({
      result: "cancel"
    })
  }
}
