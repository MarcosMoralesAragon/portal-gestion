import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { State } from 'src/app/models/state';
import { Worker } from '../../models/worker';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  workers:Worker[] = [
    {
    id: 1,
    name: "Marcos",
    dni: "12345678A",
    firstName: "Morales",
    lastName: "Aragón",
    nationality: "Española",
    state : State.Working,
    bornDate: new Date()
  },{
    id: 2,
    name: "Sergio",
    dni: "12345678B",
    firstName: "García",
    lastName: "Nose",
    nationality: "Española",
    state : State.Working,
    bornDate: new Date()
  },{
    id: 3,
    name: "Noel",
    dni: "12345678Q",
    firstName: "Millan",
    lastName: "Rebollo",
    nationality: "Australiana",
    state : State.Working,
    bornDate: new Date()
  },{
    id: 4,
    name: "Ander",
    dni: "12345678Q",
    firstName: "García",
    lastName: "Brisquet",
    nationality: "Venezolano",
    state : State.Working,
    bornDate: new Date()
  },{
    id: 5,
    name: "Eustaqui",
    dni: "12345678U",
    firstName: "Habichuela",
    lastName: "Panyagua",
    nationality: "Australiana",
    state : State.Working,
    bornDate: new Date()
  },{
    id: 6,
    name: "Javier",
    dni: "12345678I",
    firstName: "Rodrigez",
    lastName: "Miura",
    nationality: "Australiana",
    state : State.Working,
    bornDate: new Date()
  },{
    id: 7,
    name: "Manuel",
    dni: "12345678S",
    firstName: "Millon",
    lastName: "Pérez",
    nationality: "Aleman",
    state : State.Working,
    bornDate: new Date()
  },{
    id: 8,
    name: "Fernando Ivan",
    dni: "12345678F",
    firstName: "Sevilla",
    lastName: "García",
    nationality: "Asiatico",
    state : State.Working,
    bornDate: new Date()
  },{
    id: 9,
    name: "Gonzalo",
    dni: "12345678J",
    firstName: "Salmeron",
    lastName: "Molilla",
    nationality: "Colombiano",
    state : State.Working,
    bornDate: new Date()
  }]

  constructor() { }

  getWorkers() : Observable<Worker[]>{
    return of(this.workers)
  }

  deleteWorker(workerId : number){
    this.workers =  this.workers.filter(worker => worker.id !== workerId);
    console.log(this.workers)
  }

  updateWorker(workerChanged : Worker){

    this.workers = this.workers.filter(worker => worker.id !== workerChanged.id)
    this.workers.push(workerChanged)


    // var index = this.workers.findIndex(worker => worker.id === workerChanged.id)
    // this.workers[index] = workerChanged
    // console.log(this.workers)
  }

  addWorkers(newWorker : Worker){
    this.workers.push(newWorker)
    this.workers = this.workers
    console.log(this.workers)
  }

  getFullName(idWorker : number) : string{
    var workerSearched : Worker
    workerSearched = this.workers.find(worker => worker.id === idWorker)!
    return workerSearched.name + " " + workerSearched.firstName + " " + workerSearched.lastName
  }

}
