import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Worker } from 'src/app/models/worker';
import { BinService } from 'src/app/services/bin/bin.service';
import { DateService } from 'src/app/services/date/date.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { StateService } from 'src/app/services/state/state.service';
import { WorkerService } from 'src/app/services/worker/worker.service';
import { DialogDeleteComponent } from '../dialog/dialog-delete/dialog-delete.component';

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
              public snackBarService: SnackBarService,
              public workerService : WorkerService,
              public dialogService : DialogService) { }

  ngOnInit(): void {
    this.binService.getBin().subscribe(worker => {
      this.deletedWorkers = worker
      this.dataSource = new MatTableDataSource<Worker>(this.deletedWorkers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }

  delete(workerId : string){
    this.dialogService.openDialog(DialogDeleteComponent).subscribe(result => {
      if(result != "delete"){
        this.snackBarService.showSnackBarError(result, "Acción cancelada")
        return;
      }
      this.binService.deleteFromBin(workerId).subscribe(isDeleted => {
        if(!isDeleted){
          this.snackBarService.showSnackBarError(result, "Acción cancelada")
          return;
        }
        this.ngOnInit()
        this.snackBarService.showSnackBar(result, "¡Borrado con éxito!")
      })
    });
  }

  restore(workerId : string){
    this.binService.restore(workerId).subscribe(isRestored => {
      if(!isRestored){
        this.snackBarService.showSnackBarError("restore", "Algo salio mal")
        return;
      }
      this.ngOnInit()
      this.snackBarService.showSnackBar("restore", "Restaurado todos con éxito!")
    })
  }

  goBack(){
    this.route.navigateByUrl('')
  }

  restoreAll(){
    this.binService.restoreAll().subscribe(isRestoredAll => {
      if(isRestoredAll){
        this.ngOnInit()
        this.snackBarService.showSnackBar("restore", "Restaurados todos con éxito!")
      } else {
        this.snackBarService.showSnackBarError("restore", "Algo salio mal")
      }
    })
  }

  deleteAll(){
    this.binService.deleteAllBin().subscribe(allDeleted => {
      if(allDeleted){
        this.ngOnInit()
        this.snackBarService.showSnackBar("delete", "¡Borrado con éxito!")
      }else{
        this.snackBarService.showSnackBarError("delete", "Algo salio mal")
      }
    })
  }
  
  refresh(){
    this.ngOnInit()
    this.snackBarService.showSnackBar("refresh","Recarga completa")
  }

}