import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { State } from 'src/app/models/state';
import { Worker } from '../../models/worker';
import { AddressService } from '../address/address.service';
import { BinService } from '../bin/bin.service';
import {HttpClient} from '@angular/common/http';

const url = 'http://localhost:8080/workers'

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  workers:Worker[] = []
  prueba:any

  constructor(public addressService : AddressService,
              public binService : BinService,
              public http : HttpClient) { 
              }

  getWorkers() : Observable<any>{
    // for (let i = 0; i < this.workers.length; i++) {
    //   this.workers[i].address = this.addressService.getAddressOfWorker(this.workers[i].id)      
    // }
    return this.http.get(url)
  }

  deleteWorker(workerId : string){
    this.binService.addToBin(this.workers.find(worker => worker.id === workerId)!)
    this.workers =  this.workers.filter(worker => worker.id !== workerId);
    this.addressService.deleteAddress(workerId);
  }

  updateWorker(workerChanged : Worker){

    this.workers = this.workers.filter(worker => worker.id !== workerChanged.id)
    this.workers.push(workerChanged)

    // var index = this.workers.findIndex(worker => worker.id === workerChanged.id)
    // this.workers[index] = workerChanged
    // console.log(this.workers)
  }

  addWorkers(newWorker: Object): Observable<Object>{
    return this.http.post(url, newWorker)
  }

  getFullName(idWorker : string) : string{
    var workerSearched : Worker
    workerSearched = this.workers.find(worker => worker.id === idWorker)!
    return workerSearched.name + " " + workerSearched.firstName + " " + workerSearched.lastName
  }

  restoreAllBin(workerList : Worker[]){
    for (let i = 0; i < workerList.length; i++) {
      this.addWorkers(workerList[i])
    }
  }

}
