import {  Component, OnInit, ViewChild } from '@angular/core';
import { Worker } from 'src/app/models/worker';
import { WorkerService } from 'src/app/services/worker/worker.service';
import { DialogDeleteComponent } from '../dialog/dialog-delete/dialog-delete.component';
import { DialogEditComponent } from '../dialog/dialog-edit/dialog-edit.component';
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
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

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
              public dialogService : DialogService,
              private snackBarService : SnackBarService,
              private router: Router,
              public dateService : DateService,
              public stateService : StateService,
              public addressService : AddressService,
              public binService : BinService) { }

  ngOnInit() : any{
    this.chargueData()
  }

  chargueData(){
    this.workerService.getWorkers().subscribe(worker => {
      this.workers= worker;
      this.dataSource = new MatTableDataSource<Worker>(this.workers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    },
    (error:any) => {
      this.snackBarService.showSnackBarError("error", "Servidor desconectado. " + error.message)
    });
  }

  openDialogDelete(workerId : string) {
    this.dialogService.openDialog(DialogDeleteComponent).subscribe(result => {
      
      if(result != "delete"){
        this.snackBarService.showSnackBarError(result, "Acci??n cancelada")
        return;
      }
      this.binService.addToBin(this.workers.find(worker => worker.id === workerId)!).subscribe(addedToBin => {
        if(!addedToBin){
          this.snackBarService.showSnackBarError(result, "Acci??n cancelada")
          return;
        }
        this.workerService.deleteWorker(this.workers.find(worker => worker.id === workerId)!).subscribe(deleteWorked => {
          if (!deleteWorked) {
            this.snackBarService.showSnackBarError(result, "Borrado fallido")
            return;
          }
          this.chargueData()
          this.snackBarService.showSnackBar(result, "??Borrado con ??xito!")
        })
      })
    });
  }

  openDialogEdit(workerId : string){
    this.dialogService.openDialog(DialogEditComponent, {...this.workers.find(worker => worker.id === workerId)}, '800px', '600px').subscribe(result =>{
      if(result?.result != "edit"){
        this.snackBarService.showSnackBarError(result, "Acci??n cancelada")
        return;
      }
      this.workerService.updateWorker(result.worker).subscribe(isChanged => {
        if (!isChanged) {
          this.snackBarService.showSnackBarError(result.result, "Editado fallido")
          return;
        }
        this.chargueData()        
        this.snackBarService.showSnackBar(result.result, "??Editado con ??xito!")
      })
    })
  }

  openDialogEditAddress(workerId : string){
    this.dialogService.openDialog(DialogEditAddressComponent,{...this.workers.find(worker => worker.id === workerId)?.address}).subscribe(result =>{
      if(result?.result != "edit"){
        this.snackBarService.showSnackBarError(result, "Acci??n cancelada")
        return;
      }
      this.addressService.updateAddress(result.data).subscribe(isEdited => {
        if(!isEdited){
          this.snackBarService.showSnackBarError(result, "Algo salio mal")
          return;
        }
        this.chargueData()
        this.snackBarService.showSnackBar(result.result, "??Editado con ??xito!")
      })
    })
  }

  openDialogCreateAddress(workerId : string){
    this.dialogService.openDialog(DialogCreateAddressComponent,workerId).subscribe(result => {
      if(result?.result == "create"){
        this.addressService.addAddress(result.data).subscribe(isCreated => {
          if(isCreated){
            this.ngOnInit()        
            this.snackBarService.showSnackBar(result.result, "??Creado con ??xito!")
          }else{
            this.snackBarService.showSnackBarError(result, "Algo salio mal ")
          }
        })
      } else {
        this.snackBarService.showSnackBarError(result, "Acci??n cancelada")
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

  refreshButton() : any{
    this.ngOnInit()
    this.snackBarService.showSnackBar("refresh", "??Refrescado con ??xito!")
  }
}
