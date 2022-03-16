import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  openDialog(dialogOpening: ComponentType<unknown>, dataSend ?: any, width ?: any, height ?: any) : Observable<any>{
    const dialogRef = this.dialog.open(dialogOpening, {
      data : dataSend,
      width : width,
      height : height
    })
    return dialogRef.afterClosed()
  }
}
  