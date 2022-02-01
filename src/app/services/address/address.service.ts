import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Address } from 'src/app/models/address';


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  address : Address[] = [
    {
      id: "1",
      street: "Pasaje de Chinitas",
      number: 3,
      block: "44",
      floor: "2",
      door: "C",
      postCode: 29007,
      locality: "Málaga",
      province: "Málaga",
      idWorker: "1"
    },{
      id: "2",
      street: "Calle Marqués de Larios",
      number: 7,
      block: "53",
      floor: "4",
      door: "D",
      postCode: 29001,
      locality: "Málaga",
      province: "Málaga",
      idWorker: "2"
    },{
      id: "3",
      street: "Calle Comedias",
      number: 9,
      block: "59",
      floor: "3",
      door: "H",
      postCode: 29005,
      locality: "Málaga",
      province: "Málaga",
      idWorker: "3"
    },{
      id: "4",
      street: "Calle Císter",
      number: 1,
      block: "2",
      floor: "2",
      door: "A",
      postCode: 29004,
      locality: "Málaga",
      province: "Málaga",
      idWorker: "4"
    },

  ]
  constructor() { }

  getAddress() : Observable<Address[]>{
    return of(this.address)
  }

  getAddressOfWorker(workerId : string){
    return this.address.find(address => address.idWorker === workerId)
  }

  getAddressLenght() : number{
    return this.address.length
  }

  addAddress(newAddress : Address) {
    this.address.push(newAddress)
  }

  deleteAddress(workerId : string){
    this.address = this.address.filter(address => address.idWorker !== workerId)
  }

  updateAddress(addressEdited : Address){
    this.address = this.address.filter(address => address.id !== addressEdited.id)
    this.address.push(addressEdited)
  }
}
