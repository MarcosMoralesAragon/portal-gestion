import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contract } from 'src/app/models/contract';
import { Position } from 'src/app/models/position';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  contract: Contract[] = [
    {
      id: 1,
      dateStartContract: new Date(),
      idWorkerAsigned: 1,
      position: Position.Executive,
      salary: 1100.50,
      dateEndContract: new Date()
    },{
      id: 2,
      dateStartContract: new Date() ,
      idWorkerAsigned: 2 ,
      position: Position.Officer,
      salary: 1200.30
    },{
      id: 3,
      dateStartContract: new Date() ,
      idWorkerAsigned: 3,
      position: Position.Technician ,
      salary: 1300.90
    }]

  constructor() { }

  deleteContract(contractId : number){
    this.contract =  this.contract.filter(contract => contract.id !== contractId);
    console.log(this.contract)
  }

  getContracts() : Observable<Contract[]>{
    return of(this.contract)
  }

  getContractsOfWorker(idWorker : number){
    return of(this.contract.filter(contract => contract.idWorkerAsigned === idWorker))
  }

  getContract(idContract : number){
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


    // var index = this.workers.findIndex(worker => worker.id === workerChanged.id)
    // this.workers[index] = workerChanged
    // console.log(this.workers)
  }
}
