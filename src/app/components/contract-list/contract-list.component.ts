import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from 'src/app/models/contract';
import { ContractService } from 'src/app/services/contract/contract.service';
import { DateService } from 'src/app/services/date/date.service';
import { PositionService } from 'src/app/services/position/position.service';
import { DialogDeleteComponent } from '../dialog/dialog-delete/dialog-delete.component';
import { DialogCreateContractComponent } from '../dialog/dialog-create-contract/dialog-create-contract.component';
import { DialogEditContractComponent } from '../dialog/dialog-edit-contract/dialog-edit-contract.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

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
              public positionService : PositionService,
              public dateService : DateService,
              public dialog: MatDialog,
              private snackBarService: SnackBarService,
              private router : Router) { }

  ngOnInit(): void {
    this.idWorker = this.activatedRoute.snapshot.paramMap.get('id')
    this.getContracts(this.idWorker!).subscribe(contract => {
      this.contracts = contract
      console.log(this.contracts)
      this.dataSource = new MatTableDataSource<Contract>(this.contracts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }

  openDialogDelete(contractId : string) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {

      if(result == "delete"){

        this.contractService.deleteContract(contractId).subscribe(isDeleted => {
          if(isDeleted){
            this.ngOnInit()
            this.snackBarService.showSnackBar(result, "¡Borrado con éxito!")
          } else {
            this.snackBarService.showSnackBarError(result, "Algo salio mal")
          }
        })
        
      } else {
        this.snackBarService.showSnackBarError(result, "Acción cancelada")
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
        console.log(result.contract)
        this.contractService.addContract(result.contract).subscribe(isAdded => {
          this.ngOnInit()
          this.snackBarService.showSnackBar(result.result, "¡Contrato creado con exito!")
        })
      } else {
        this.snackBarService.showSnackBarError(result, "Acción cancelada")
      }
    });
  }

  openDialogEdit(contractId : string) {
    
    var contractEditing : Contract;

    this.getContractById(contractId).subscribe(contract => {
      contractEditing = contract
      const dialogRef = this.dialog.open(DialogEditContractComponent, {
        data: contractEditing!
      })
      dialogRef.afterClosed().subscribe(result => {
        if(result?.result != "edit"){
          this.snackBarService.showSnackBarError(result, "Acción cancelada")
          return;
        }
        this.contractService.updateContract(result.contract).subscribe(isUpdated => {
          if(!isUpdated){
            this.snackBarService.showSnackBarError(result, "Algo salio mal")
            return;
          }
          this.ngOnInit()
          this.snackBarService.showSnackBar(result.result, "¡Contrato editado!")
        })
      });
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

  getContracts(idWorker : string): Observable<any>{
    return this.contractService.getContractsOfWorker(idWorker)
  }
  
  getContractById(idContract : string) : Observable<any>{
    return this.contractService.getContract(idContract)
  }
}