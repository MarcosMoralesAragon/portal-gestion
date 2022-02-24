import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../snackBar/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog,
              public snackBarService : SnackBarService) { }

  openDialogCreateAddress(dialogOpening: ComponentType<unknown>, dataSend : any, acction: string, serviceAction : any, reload : () => unknown) : any{
    const dialogRef = this.dialog.open(dialogOpening, {
      data : dataSend
    })
    dialogRef.afterClosed().subscribe(result =>{
      if(result?.result != acction){
        this.snackBarService.showSnackBarError(result, "Acción cancelada")
        return;
      }
      serviceAction.addAddress(result.data).subscribe((isCreated: any) => {
        if(!isCreated){
          this.snackBarService.showSnackBarError(result, "Algo salio mal ")
          return;
        }   
        this.snackBarService.showSnackBar(result.result, "¡Acción compleata!")
        reload()
        return true;
      })
      return;
    })
  }
}
