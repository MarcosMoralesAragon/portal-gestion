import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SnackBarService } from '../snackBar/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog,
              public snackBarService : SnackBarService) { }

  openDialog(dialogOpening: ComponentType<unknown>, dataSend ?: any, width ?: any, height ?: any) : Observable<any>{
    const dialogRef = this.dialog.open(dialogOpening, {
      data : dataSend,
      width : width,
      height : height
    })
    return dialogRef.afterClosed()
  }
}
  