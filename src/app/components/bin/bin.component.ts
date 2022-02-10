import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Worker } from 'src/app/models/worker';
import { BinService } from 'src/app/services/bin/bin.service';
import { DateService } from 'src/app/services/date/date.service';
import { StateService } from 'src/app/services/state/state.service';
import { WorkerService } from 'src/app/services/worker/worker.service';
import { DialogDeleteComponent } from '../dialog/dialog-delete/dialog-delete.component';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss']
})
export class BinComponent implements OnInit {

  deletedWorkers : Worker[] = []

  displayedColumns: string[] = ['id', 'fullName', 'nationality', 'dni', 'bornDate', 'state', 'address', 'delete', 'restore'];
  dataSource = new MatTableDataSource<Worker>(this.deletedWorkers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public binService : BinService,
              public stateService : StateService,
              public dateService : DateService,
              public route : Router,
              public _snackBar : MatSnackBar,
              public workerService : WorkerService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.binService.getBin().subscribe(worker => {
      this.deletedWorkers = worker
      this.dataSource = new MatTableDataSource<Worker>(this.deletedWorkers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }

  showSnackBar(acctionDone:string, message: string){
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration : 3250,
      panelClass: ['green-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
      
      data:{
        messageSnackbar: message,
        acctionDoneSnackbar : acctionDone
      } 
    })
  }

  showSnackBarError(acctionDone:string, message: string){
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration : 3250,
      panelClass: ['red-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data:{
        messageSnackbar: message,
        acctionDoneSnackbar : acctionDone
      } 
    })
  }

  delete(workerId : string){
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {

      if(result == "delete"){
        this.binService.deleteFromBin(workerId).subscribe(isDeleted => {
          this.ngOnInit()
          this.showSnackBar(result, "¡Borrado con éxito!")
        })
      } else {
        this.showSnackBarError(result, "Acción cancelada")
      }
    });
  }

  restore(workerId : string){
    this.binService.restore(workerId).subscribe(isRestored => {
      if(isRestored){
        this.ngOnInit()
        this.showSnackBar("restore", "¡Restaurado con éxito!")
      } else {
        this.showSnackBarError("restore", "Algo salio mal")
      }
    })
  }

  goBack(){
    this.route.navigateByUrl('/list')
  }

  restoreAll(){
    this.binService.restoreAll().subscribe(isRestoredAll => {
      if(isRestoredAll){
        this.ngOnInit()
        this.showSnackBar("restore", "Restaurados todos con éxito!")
      } else {
        this.showSnackBarError("restore", "Algo salio mal")
      }
    })
  }

  deleteAll(){
    this.binService.deleteAllBin().subscribe(allDeleted => {
      if(allDeleted){
        this.ngOnInit()
        this.showSnackBar("delete", "¡Borrado con éxito!")
      }else{
        this.showSnackBarError("delete", "Algo salio mal")
      }
    })
  }
  
  refresh(){
    this.ngOnInit()
    this.showSnackBar("refresh","Recarga completa")
  }

}