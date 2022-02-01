import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Worker } from '../../models/worker';
import { WorkerService } from '../worker/worker.service';

@Injectable({
  providedIn: 'root'
})
export class BinService {

  bin : Worker[] = []

  constructor() { }

  getBin() : Observable<Worker[]>{
    return of (this.bin)
  }

  addToBin(workerDeleted : Worker){
    this.bin.push(workerDeleted)
    this.bin = this.bin
  }

  deleteFromBin(workerId : string){
    this.bin = this.bin.filter(worker => worker.id !== workerId)
  }

  deleteAllBin(){
    this.bin = []
  }

  getBinLength() : number{
    return this.bin.length
  }
}
