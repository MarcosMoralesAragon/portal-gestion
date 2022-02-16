import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url = "http://localhost:8080/excel"
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  sendExcelToBack(file : File){
    const formData: FormData = new FormData();
    formData.append('excel', file, file.name);
    return this.http.post(`${url}?file=${formData}` ,null);
  }

}
