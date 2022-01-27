import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent implements OnInit {


  ngOnInit(): void {
  }

  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>){
  }
  
  cancelDialog(){
    this.dialogRef.close("cancel");
  }
  deleteDialog(){
    this.dialogRef.close("delete");
  }
}
