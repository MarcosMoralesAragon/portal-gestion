import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contract } from 'src/app/models/contract';
import { Position } from 'src/app/models/position';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  contract: Contract[] = []

  constructor() { }

  deleteContract(contractId : string){
    this.contract =  this.contract.filter(contract => contract.id !== contractId);
    console.log(this.contract)
  }

  getContracts() : Observable<Contract[]>{
    return of(this.contract)
  }

  getContractsOfWorker(idWorker : string){
    return of(this.contract.filter(contract => contract.idWorkerAsigned === idWorker))
  }

  getContract(idContract : string){
    return this.contract.find(contract => contract.id === idContract)
  }

  addContract(newContract : Contract){
    this.contract.push(newContract)
  }

  getContractsLenght() : number {
    return this.contract.length
  }

  updateContract(contractChanged : Contract){
    this.contract = this.contract.filter(contract => contract.id !== contractChanged.id)
    this.contract.push(contractChanged)
  }
}
