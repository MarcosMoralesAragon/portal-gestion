import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { empty } from 'rxjs';
import { Contract } from 'src/app/models/contract';
import { ContractService } from 'src/app/services/contract/contract.service';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-dialog-create-contract',
  templateUrl: './dialog-create-contract.component.html',
  styleUrls: ['./dialog-create-contract.component.scss']
})
export class DialogCreateContractComponent implements OnInit {

  idWorker! : string;
  contractCreating! : Contract;
  dateEndNeeded: boolean = false
  dateEstimatedEndNeeded: boolean = false
  momentDate = new Date()
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
      this.idWorker = data
    }

  ngOnInit(): void {
    var newId = this.contractService.getContractsLenght() + 1
    this.contractCreating = {
      id: newId.toString(),
      dateStartContract: this.momentDate,
      salary: 950,
      position: 3,
      idWorkerAsigned: this.idWorker
    }
  }

  editDate(dateWhoChanged : string , event: MatDatepickerInputEvent<Date>){
    switch (dateWhoChanged) {
      case "start":
          this.contractCreating.dateStartContract = event.value!
        break;
    case "end":
        this.contractCreating.dateEndContract = event.value!
        break;
    case "estimatedEnd":
        this.contractCreating.dateEstimatedEndContract = event.value!
        break;
      default:
        break;
    }
    console.log(this.contractCreating)
  }

  createEndContractDate(){
    this.contractCreating.dateEndContract = new Date();
    this.dateEndNeeded = true;
  }

  createEstimatedEndContractDate(){
    this.contractCreating.dateEstimatedEndContract = new Date();
    this.dateEstimatedEndNeeded = true;
  }

  cancel(){
    this.dialogRef.close("cancel")
  }
  create(){
    this.dialogRef.close({
      result : "create",
      contract: this.contractCreating
    })
  }

}
