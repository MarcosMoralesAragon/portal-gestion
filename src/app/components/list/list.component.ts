import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Worker } from 'src/app/models/worker';
import { WorkerService } from 'src/app/services/worker/worker.service';
import { DialogDeleteComponent } from '../dialog/dialog-delete/dialog-delete.component';
import { DialogEditComponent } from '../dialog/dialog-edit/dialog-edit.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Router } from '@angular/router';
import { DateService } from 'src/app/services/date/date.service';
import { StateService } from 'src/app/services/state/state.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AddressService } from 'src/app/services/address/address.service';

import { DialogEditAddressComponent } from '../dialog/dialog-edit-address/dialog-edit-address.component';
import { DialogCreateAddressComponent } from '../dialog/dialog-create-address/dialog-create-address.component';
import { BinService } from 'src/app/services/bin/bin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  workers: Worker[] = [];
  date : Date = new Date()

  displayedColumns: string[] = ['id', 'fullName', 'nationality', 'dni', 'bornDate', 'state', 'delete', 'edit', 'contract', 'address'];
  dataSource = new MatTableDataSource<Worker>(this.workers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public workerService: WorkerService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private router: Router,
              public dateService : DateService,
              public stateService : StateService,
              public addressService : AddressService,
              public binService : BinService) { }

  ngOnInit(): void {
    this.getWorkers().subscribe(worker => {
      this.workers= worker;
      this.dataSource = new MatTableDataSource<Worker>(this.workers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    });
  }

  openDialogDelete(workerId : string) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      
      if(result == "delete"){
        this.workerService.deleteWorker(this.workers.find(worker => worker.id === workerId)!).subscribe(deleteWorked => {
          if (deleteWorked) {
            this.ngOnInit()
            this.showSnackBar(result, "¡Borrado con éxito!")
          } else {
            this.showSnackBarError(result, "Borrado fallido")
          }
        })
      } else {
        this.showSnackBarError(result, "Acción cancelada")
      }
    });
  }

  openDialogEdit(workerId : string){
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '800px',
      height: '600px',
      data : {...this.workers.find(worker => worker.id === workerId)}
    })

    dialogRef.afterClosed().subscribe(result =>{
      if(result?.result == "edit"){
        this.workerService.updateWorker(result.worker).subscribe(isChanged => {
          if (isChanged) {
            this.ngOnInit()        
            this.showSnackBar(result.result, "¡Editado con éxito!")
          } else {
            this.showSnackBarError(result.result, "Editado fallido")
          }
        })
      } else {
        this.showSnackBarError(result, "Acción cancelada")
      }
    })
  }

  openDialogEditAddress(workerId : string){
    const dialogRef = this.dialog.open(DialogEditAddressComponent, {
      data : {...this.workers.find(worker => worker.id === workerId)?.address}
    })
    dialogRef.afterClosed().subscribe(result =>{
      if(result?.result == "edit"){
        this.addressService.updateAddress(result.data).subscribe(isEdited => {
          if(isEdited){
            this.ngOnInit()
            this.showSnackBar(result.result, "¡Editado con éxito!")
          } else {
            this.showSnackBarError(result, "Algo salio mal")
          }
        })
      } else {
        this.showSnackBarError(result, "Acción cancelada")
      }
    })
  }

  openDialogCreateAddress(workerId : string){
    const dialogRef = this.dialog.open(DialogCreateAddressComponent, {
      data : workerId
    })
    dialogRef.afterClosed().subscribe(result =>{
      if(result?.result == "create"){
        this.addressService.addAddress(result.data).subscribe(isCreated => {
          if(isCreated){
            this.ngOnInit()        
            this.showSnackBar(result.result, "¡Creado con éxito!")
          }else{
            this.showSnackBarError(result, "Algo salio mal ")
          }
        })
      } else {
        this.showSnackBarError(result, "Acción cancelada")
      }
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

  navigateToCreate(){
    this.router.navigateByUrl('/create')
  }

  navigateToSeeDelete(){
    this.router.navigateByUrl('/bin')
  }

  navigateToContracts(workerId : string){
    this.router.navigateByUrl('/list-contracts/' + workerId)
  }

  refreshButton(){
    this.ngOnInit()
    this.showSnackBar("refresh", "¡Refrescado con éxito!")
  }

  getWorkers(): Observable<any[]>{
    return this.workerService.getWorkers()
                      
    // this.workers.forEach(worker => {
    //   var bornDateStringSplit = worker.bornDateString.split('/')
    //   worker.bornDate = new Date( parseInt(bornDateStringSplit[2]), parseInt(bornDateStringSplit[1]) - 1, parseInt(bornDateStringSplit[0]))
    // })
  }
}
