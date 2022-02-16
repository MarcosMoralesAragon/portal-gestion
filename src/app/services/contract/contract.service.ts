import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contract } from 'src/app/models/contract';

const url = 'http://localhost:8080/contract'

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(public http : HttpClient) { }

  getContractsOfWorker(idWorker : string) : Observable<any>{
    return this.http.get(`${url}s/${idWorker}`)
  }

  deleteContract(contractId : string) : Observable<any>{
    return this.http.delete(`${url}/${contractId}`)
  }

  getContract(idContract : string) : Observable<any>{
    return this.http.get(`${url}/${idContract}`)
  }

  addContract(newContract : Contract) : Observable<any>{
    return this.http.post(url, newContract)
  }

  addContractFromExcel(newContract : unknown) : Observable<any>{
    return this.http.post(url, newContract)
  }

  updateContract(contractChanged : Contract) : Observable<any> {
    console.log("hola")
    console.log(contractChanged.id)
    return this.http.put(url, contractChanged)
  }
}
