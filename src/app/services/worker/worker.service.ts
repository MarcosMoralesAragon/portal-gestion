import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  
  constructor(public addressService : AddressService,
              public binService : BinService,
              public http : HttpClient) { 
              }

  getWorkers() : Observable<any>{
    return this.http.get(url)
  }

  deleteWorker(worker : Worker) : Observable<Object>{
    this.binService.addToBin(worker)
    return this.http.delete(`${url}/${worker.id}`)
  }

  updateWorker(workerChanged : Worker) : Observable<Object>{
    console.log("Edita")
    return this.http.put(url ,workerChanged)
  }

  addWorkers(newWorker: Object): Observable<Object>{
    return this.http.post(url, newWorker)
  }

  addWorkersFromExcel(newWorker: any): Observable<Object>{
    return this.http.post(url, newWorker)
  }

  getFullName(idWorker : string) : string{
    var workerSearched : Worker
    workerSearched = this.workers.find(worker => worker.id === idWorker)!
    return workerSearched.name + " " + workerSearched.firstName + " " + workerSearched.lastName
  }
}
