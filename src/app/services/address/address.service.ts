import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Address } from 'src/app/models/address';

const url = 'http://localhost:8080/address'

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http : HttpClient) { }

  getAddressOfWorker(workerId : string) : Observable<any>{
    return this.http.get(`${url}/${workerId}`)
  }

  addAddress(newAddress : Address) {
    return this.http.post(url, newAddress)
  }

  addFromExcel(newAddress : unknown) {
    return this.http.post(url, newAddress)
  }

  updateAddress(addressEdited : Address){
    return this.http.put(url, addressEdited)
  }
}
