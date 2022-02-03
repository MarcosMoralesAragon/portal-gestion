import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateService } from 'src/app/services/date/date.service';
import { Worker } from '../../../models/worker';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss']
})
export class DialogEditComponent implements OnInit {

  workerEditing: Worker;
  prueba:string = "No"
  dateChanged : boolean = false

  states = [
    {value: "Working", text: "Alta"},
    {value: "Down", text: "Baja"},
    {value: "InProcess", text: "En Trámite"}
  ];

  constructor(public dialogRef: MatDialogRef<DialogEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dateService : DateService) {
    console.log(data)
    this.workerEditing = this.data
  }

  ngOnInit(): void {
    
  }

  editDate(event: MatDatepickerInputEvent<Date>){
    this.workerEditing.bornDate = event.value!
    this.dateChanged = true
    console.log(this.workerEditing)
  }
  
  cancel(){
    this.dialogRef.close("cancel");
  }

  edit(){
    this.dialogRef.close({
      result: "edit",
      worker : this.workerEditing
    });
  }
}
