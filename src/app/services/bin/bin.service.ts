import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Worker } from '../../models/worker';

const url = 'http://localhost:8080/bin'

@Injectable({
  providedIn: 'root'
})
export class BinService {
  constructor(private http : HttpClient) { }

  getBin() : Observable<any>{
    return this.http.get(url);
  }

  addToBin(workerDeleted : Worker) : Observable<any>{
    return this.http.post(`${url}-add`, workerDeleted);
  }

  deleteFromBin(workerId : string) : Observable<any>{
    return this.http.delete(`${url}-delete/${workerId}`)
  }

  deleteAllBin(): Observable<any>{
    return this.http.delete(`${url}-deleteAll`)
  }

  restore(workerId : string) : Observable<any>{
    return this.http.delete(`${url}-restore/${workerId}`)
  }

  restoreAll() : Observable<any>{
    return this.http.delete(`${url}-restoreAll`)
  }
}
