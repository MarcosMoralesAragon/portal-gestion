import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Contract } from 'src/app/models/contract';
import { Worker } from 'src/app/models/worker';
import { ContractService } from 'src/app/services/contract/contract.service';
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

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  workers: Worker[] = [];
  contracts : Contract[] = [];
  date : Date = new Date();
  displayedColumns: string[] = ['id', 'fullName', 'nationality', 'dni', 'bornDate', 'state', 'delete', 'edit', 'contract'];
  dataSource = new MatTableDataSource<Worker>(this.workers);
  workerDelete: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public workerService: WorkerService,
              private contractService : ContractService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private router: Router,
              public dateService : DateService,
              public stateService : StateService) { }

  ngOnInit(): void {
    this.getWorkers()
    this.getContracts()
    this.dataSource = new MatTableDataSource<Worker>(this.workers);
    console.log(this.workers)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

  openDialogDelete(workerId : number) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      
      if(result == "delete"){
        this.workerService.deleteWorker(workerId)
        this.ngOnInit()
        this.ngAfterViewInit()
        
        this.showSnackBar(result, "¡Borrado con éxito!")
      } else {
        this.showSnackBarError(result, "Acción cancelada")
      }
    });
  }

  openDialogEdit(workerId : number){
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '800px',
      height: '600px',
      data : {...this.workers.find(worker => worker.id === workerId)}
    })

    dialogRef.afterClosed().subscribe(result =>{
      if(result.result == "edit"){
        this.workerService.updateWorker(result.worker)
        this.ngOnInit()
        this.ngAfterViewInit()
        
        this.showSnackBar(result.result, "¡Editado con éxito!")
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
    console.log("See delete")
  }

  navigateToContracts(workerId : number){
    this.router.navigateByUrl('/list-contracts/' + workerId)
  }

  refreshButton(){
    this.ngOnInit()
  }

  

  getWorkers(): void{
    this.workerService.getWorkers()
                      .subscribe(worker => {
                        this.workers = worker
                      });
  }
  getContracts() : void {
    this.contractService.getContracts()
                        .subscribe(contract => this.contracts = contract)
  }
}
