import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { WorkerService } from './services/worker/worker.service';
import { ContractService } from './services/contract/contract.service';
import { AddressService } from './services/address/address.service';
import { Worker } from './models/worker';
import { Contract } from './models/contract';
import { Address } from './models/address';
import { Observable } from 'rxjs';
import { SnackBarService } from './services/snackBar/snack-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'portal-gestion';

  constructor(private router:Router,
              private snackBarService : SnackBarService,
              private workerService : WorkerService,
              private contractService : ContractService,
              private addressService : AddressService){}
  
  onFileSelected(event : any) {
    // Saca el archivo introducido
    let file:File = event.target.files[0];
    // Limpia el input antes de usarlo
    event.srcElement.value = "";
    if(!file){
      this.snackBarService.showSnackBarError("updateFile", "Subida de archivo cancelada")
      return;
    }
    if(this.getFileExtension(file.name) !== "xlsx"){
      this.snackBarService.showSnackBarError("updateFile", "Formato de archivo no admitido. Tiene que ser xlsx")
      return;
    } 
    // Objeto que nos permite leer el archivo
    var fileReader = new FileReader();
    fileReader.readAsBinaryString(file)

    fileReader.onload = (event:any) => {
      // Saca los datos y lo vuelve un binario
      let binaryData = event.target.result
      // Crea un objeto con todos los datos del xlsx que le hemos pasado
      let workbook = XLSX.read(binaryData,{type:'binary', cellDates : true})
      if(!this.sheetNamesAreOk(workbook.SheetNames)){ 
        this.snackBarService.showSnackBarError("updateFile", "Revise que las hojas del fichero estan correctas")
        return;
      }
      // Por cada hoja del xlsx lo combierte a un json los datos de las columnas
      var workersWrong: Array<number> = []
      var contractsWrong: Array<number> = []
      var addressWrong: Array<number> = []

      workbook.SheetNames.forEach(sheet => {
        // Hace json la hoja sheet
        let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
              
        switch (sheet) {

          case "Empleados":
            console.log("Esta en empleado");
            this.addElement(data, this.workerService, this.checkWorker , workersWrong);
          break;
          case "Contratos":
            console.log("Esta en contrato")
            this.addElement(data, this.contractService, this.checkContract , contractsWrong);
          break;

          case "Direcciones":
            console.log("Esta en dirección")
            this.addElement(data, this.addressService, this.checkAddress , addressWrong);
          break;
                
          default:
          break;
        }
      })
      if(workersWrong.length > 0 || contractsWrong.length > 0 || addressWrong.length > 0 ){
       setTimeout(() =>{ 
         var info : string = this.infoWhereIsWrong(workersWrong, contractsWrong, addressWrong)
         this.snackBarService.showSnackBarWarning("updateFile", "Algunas lineas del fichero no se han podído cargar por errores en sus datos , las líneas son : " + info)
        }, 50)
      } else {
       this.snackBarService.showSnackBar("updateFile", "Fichero cargado con exito. Presione actualizar para ver las importaciones")
      }
    }
  }


  addElement(row: any[], serviceElement : any, checkElement : (element : any) => boolean, errorsArray: any[]) {
    row.forEach(element => {
      if(element != null){
        console.log(element)
        // Comprueba que ningun campo este a null
        if(checkElement(element as Worker | Address | Contract)){
          serviceElement.addFromExcel(element).subscribe((addOkay : any) => {
           if(addOkay){
              console.log("Empleado en línea " + (row.indexOf(element) + 2) + " guardado")
            } 
         }
         , (error:any) => {
            console.log("Empleado en línea " + (row.indexOf(element) + 2) + " contiene errores")
            errorsArray.push(row.indexOf(element) + 2)
         })
        } else {
          errorsArray.push(row.indexOf(element) + 2)
        }
      }
    });
  }

  getFileExtension(fileName : string) : string{
    if(fileName.length > 4){
      var legth = fileName.length
      var fileSplit = fileName.split('')
      return fileSplit[legth - 4] + fileName[legth - 3] + fileName[legth - 2] + fileName [legth - 1]
    } else {
      return ""
    }
  }

  sheetNamesAreOk(sheets : string[]) : boolean{
    var nameOfSheets = [
      {name : "Empleados" , found : false},
      {name : "Contratos" , found : false}, 
      {name : "Direcciones" , found : false}
    ]
    // Primero solo debe de tener 3 páguinas
    if(sheets.length == 3){
      // Por cada lista vamos a recorrer la lista de nombres predefinidos que deben de tener las listas
      sheets.forEach(sheet => {
        // Compara los nombres de la lista con los que debería tener, si coinciden cambia found a true
        nameOfSheets.forEach(name => {
          if(sheet == name.name){
            name.found = true;
          }
        })
      })
      console.log(nameOfSheets)
      // Si todos salen verdaderos los nombres de las hojas estan bien
      if(nameOfSheets[0].found && nameOfSheets[0].found && nameOfSheets[0].found){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkWorker(worker : Worker) : boolean{
    if(worker.id && worker.name && worker.firstName && worker.lastName && worker.dni && worker.bornDate && worker.nationality && worker.state){
      return true;
    }else {
      return false;
    }
  }

  checkContract(contract : Contract) : boolean{
    if(contract.id && contract.dateStartContract && contract.salary && contract.position && contract.idWorkerAsigned){
      return true;
    }else {
      return false;
    }
  }

  checkAddress(address : Address) : boolean{
    if(address.id && address.street && address.block && address.floor && address.door && address.postCode && address.locality && address.province && address.idWorker){
      return true;
    }else {
      return false;
    }
  }

  infoWhereIsWrong(workersWrong : number[], contractsWrong : number[], addressWrong : number[]) : string{
    var stringResult = ""
    if(workersWrong){
      stringResult += "ㅤㅤEmpleado : " + workersWrong.toString()
      console.log
    }
    if(contractsWrong){
      stringResult += "ㅤㅤContrato : " + contractsWrong.toString()
    }
    if(addressWrong){
      stringResult += "ㅤㅤDireccion : " + addressWrong.toString()
    }
    return stringResult
  }

  goToList(){
    this.router.navigateByUrl('/')
  }
}
