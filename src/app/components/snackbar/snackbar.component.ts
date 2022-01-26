import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  acctionSuccesfull : boolean = false

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data)
    if ((this.data.acctionDoneSnackbar == "delete") || (this.data.acctionDoneSnackbar == "edit") || (this.data.acctionDoneSnackbar == "create")) {
      this.acctionSuccesfull = true;
    }
  }
}
