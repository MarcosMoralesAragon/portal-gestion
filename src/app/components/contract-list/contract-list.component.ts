import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from 'src/app/models/contract';
import { ContractService } from 'src/app/services/contract/contract.service';
import { DateService } from 'src/app/services/date/date.service';
import { PositionService } from 'src/app/services/position/position.service';
import { WorkerService } from 'src/app/services/worker/worker.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { DialogDeleteComponent } from '../dialog/dialog-delete/dialog-delete.component';
import { DialogCreateContractComponent } from '../dialog/dialog-create-contract/dialog-create-contract.component';
import { DialogEditContractComponent } from '../dialog/dialog-edit-contract/dialog-edit-contract.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {

  contracts : Contract[] = []
  idWorker! : string | null 
  displayedColumns: string[] = ['id', 'dateStartContract', 'salary', 'position', 'dateEndContract', 'dateEstimatedEndContract', 'delete', 'edit'];
  dataSource = new MatTableDataSource<Contract>(this.contracts);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private activatedRoute : ActivatedRoute,
              private contractService : ContractService,
              private workerService : WorkerService,
              public positionService : PositionService,
              public dateService : DateService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private router : Router) { }

  ngOnInit(): void {
    this.idWorker = this.activatedRoute.snapshot.paramMap.get('id')
    this.getContracts(this.idWorker!)
    this.dataSource = new MatTableDataSource<Contract>(this.contracts);
    console.log(this.contracts)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

  openDialogDelete(contractId : string) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {

      if(result == "delete"){

        this.contractService.deleteContract(contractId)
        this.ngOnInit()
        this.ngAfterViewInit()

        this.showSnackBar(result, "¡Borrado con éxito!")
      } else {
        this.showSnackBarError(result, "Acción cancelada")
      }
    });
  }

  openDialogCreate(){
    const dialogRef = this.dialog.open(DialogCreateContractComponent, 
      {
        width: '750px',
        height: '550px',
        data: this.idWorker
      });
    dialogRef.afterClosed().subscribe(result => {

      if(result?.result == "create"){
        this.contractService.addContract(result.contract)
        this.ngOnInit()
        this.ngAfterViewInit()
        this.showSnackBar(result.result, "¡Contrato creado con exito!")
      } else {
        this.showSnackBarError(result, "Acción cancelada")
      }
    });
  }

  openDialogEdit(contractId : string) {
    const dialogRef = this.dialog.open(DialogEditContractComponent, {
      data: {...this.contractService.getContract(contractId)}
    });
    dialogRef.afterClosed().subscribe(result => {

      if(result?.result == "edit"){

        this.contractService.updateContract(result.contract)
        this.ngOnInit()
        this.ngAfterViewInit()

        this.showSnackBar(result.result, "¡Contrato editado!")
      } else {
        this.showSnackBarError(result, "Acción cancelada")
      }
    });
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

  navigateToSeeDelete(){
    console.log("See delete")
  }

  goBack(){
    this.router.navigateByUrl('/')
  }

  refreshButton(){
    this.ngOnInit()
  }

  getContracts(idWorker: string) : void {
    this.contractService.getContractsOfWorker(idWorker)
                        .subscribe(contract => this.contracts = contract)
  }

}
