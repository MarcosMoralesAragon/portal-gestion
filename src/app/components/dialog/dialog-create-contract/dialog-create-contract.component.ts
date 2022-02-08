import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { empty } from 'rxjs';
import { Contract } from 'src/app/models/contract';
import { Position } from 'src/app/models/position';
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
    {value: "Executive", text: "Directivo"},
    {value: "Officer", text: "Oficial"},
    {value: "Worker", text: "Operario"},
    {value: "Technician", text: "Tecnico"}
  ]

  constructor(public dialogRef: MatDialogRef<DialogCreateContractComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public contractService : ContractService,
              public dateService : DateService) { 
      this.idWorker = data
    }

  ngOnInit(): void {
    this.contractCreating = {
      id: "1",
      dateStartContract: new Date(),
      salary: 950,
      position: Position.Worker,
      idWorkerAsigned: this.idWorker,
      dateEndContract : null,
      dateEstimatedEndContract: null
    }
    console.log(this.idWorker)
    console.log(this.contractCreating)
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
    console.log(this.contractCreating)
    this.dialogRef.close({
      result : "create",
      contract: this.contractCreating
    })
  }

}
