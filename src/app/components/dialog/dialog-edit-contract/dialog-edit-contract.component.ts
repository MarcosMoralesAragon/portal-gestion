import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contract } from 'src/app/models/contract';
import { ContractService } from 'src/app/services/contract/contract.service';
import { DateService } from 'src/app/services/date/date.service';
import { DialogCreateContractComponent } from '../dialog-create-contract/dialog-create-contract.component';

@Component({
  selector: 'app-dialog-edit-contract',
  templateUrl: './dialog-edit-contract.component.html',
  styleUrls: ['./dialog-edit-contract.component.scss']
})
export class DialogEditContractComponent implements OnInit {

  contractEditing! : Contract;
  dateStartChanged : boolean = false;
  dateEndExists : boolean = false;
  dateEndChanged : boolean = false;
  dateEstimatedEndExists : boolean = false;
  dateEstimatedEndChanged : boolean = false;
  positions = [
    {value: 0, text: "Directivo"},
    {value: 1, text: "Oficial"},
    {value: 2, text: "Operario"},
    {value: 3, text: "Tecnico"}
  ]

  constructor(public dialogRef: MatDialogRef<DialogCreateContractComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public contractService : ContractService,
              public dateService : DateService) {
                console.log(data)
                this.contractEditing = this.data
                console.log(this.contractEditing)
              }

  ngOnInit(): void {
    if (this.contractEditing.dateEndContract != undefined) {
        this.dateEndExists = true
    }
    if (this.contractEditing.dateEstimatedEndContract != undefined) {
        this.dateEstimatedEndExists = true
    }
  }

  editDate(dateWhoChanged : string , event: MatDatepickerInputEvent<Date>){
    switch (dateWhoChanged) {
      case "start":
          this.contractEditing.dateStartContract = event.value!;
          this.dateStartChanged = true;
        break;
    case "end":
        this.contractEditing.dateEndContract = event.value!;
        this.dateEndChanged = true;
        break;
    case "estimatedEnd":
        this.contractEditing.dateEstimatedEndContract = event.value!;
        this.dateEstimatedEndChanged = true;
        break;
      default:
        break;
    }
  }

  createEndContractDate(){
    this.contractEditing.dateEndContract = new Date();
    this.dateEndExists = true;
  }

  createEstimatedEndContractDate(){
    this.contractEditing.dateEstimatedEndContract = new Date();
    this.dateEstimatedEndExists = true;
  }

  cancel(){
    this.dialogRef.close("cancel")
  }
  create(){
    this.dialogRef.close({
      result : "edit",
      contract: this.contractEditing
    })
  }

}
