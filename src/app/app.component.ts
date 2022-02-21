import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import * as XLSX from 'xlsx';
import { WorkerService } from './services/worker/worker.service';
import { ContractService } from './services/contract/contract.service';
import { AddressService } from './services/address/address.service';
import { Worker } from './models/worker';
import { Contract } from './models/contract';
import { Address } from './models/address';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'portal-gestion';

  constructor(private router:Router,
              private _snackBar: MatSnackBar,
              private workerService : WorkerService,
              private contractService : ContractService,
              private addressService : AddressService){}
  
  onFileSelected(event : any) {

    // Saca el archivo introducido
    let file:File = event.target.files[0];

    // Limpia el input antes de usarlo
    event.srcElement.value = "";

    if (file) {
      if(this.getFileExtension(file.name) === "xlsx"){

        console.log("si")
        // Objeto que nos permite leer el archivo
        var fileReader = new FileReader();
        fileReader.readAsBinaryString(file)

        fileReader.onload = (event:any) => {
          // Saca los datos y lo vuelve un binario
          let binaryData = event.target.result
          // Crea un objeto con todos los datos del xlsx que le hemos pasado
          let workbook = XLSX.read(binaryData,{type:'binary', cellDates : true})
          if(this.sheetNamesAreOk(workbook.SheetNames)){
            // Por cada hoja del xlsx lo combierte a un json los datos de las columnas
            var workersWrong: Array<number> = []
            var contractsWrong: Array<number> = []
            var addressWrong: Array<number> = []

            workbook.SheetNames.forEach(sheet => {
              // Hace json la hoja sheet
              let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
              
              switch (sheet) {
                case "Empleados":
                  // Cuando la hoja es emplados hace esto

                  data.forEach(worker => {
                    if(worker != null){

                      console.log(worker)
                      // Comprueba que ningun campo este a null
                      if(this.checkWorker(worker as Worker)){

                       this.workerService.addWorkersFromExcel(worker).subscribe(addOkay => {
                         if(addOkay){
                            console.log("Empleado en línea " + (data.indexOf(worker) + 2) + " guardado")
                         } 
                       }
                       , (error) => {
                          console.log("Empleado en línea " + (data.indexOf(worker) + 2) + " contiene errores")
                          workersWrong.push(data.indexOf(worker) + 2)
                       })

                      } else {
                        workersWrong.push(data.indexOf(worker) + 2)
                      }

                    }

                  });
                  break;

                case "Contratos":
                  console.log("Esta en contrato")
                  data.forEach(contract => {
                    if(contract != null){
                      console.log(contract)
                      if(this.checkContract(contract as Contract)){
                        this.contractService.addContractFromExcel(contract).subscribe(addOkay => {
                          if(addOkay){
                             console.log("Contrato en línea " + (data.indexOf(contract) + 2) + " guardado")
                          } 
                        }
                        , (error) => {
                           console.log("Contrato en línea " + (data.indexOf(contract) + 2) + " contiene errores")
                           contractsWrong.push(data.indexOf(contract) + 2)
                        })
                      } else {
                        contractsWrong.push(data.indexOf(contract))
                      }
                    }
                  });

                  break;
                case "Direcciones":
                  console.log("Esta en dirección")
                  data.forEach(address => {
                    if(address != null){
                      console.log(address)
                      if(this.checkAddress(address as Address)){
                        this.addressService.addAddressFromExcel(address).subscribe(addOkay => {
                          if(addOkay){
                             console.log("Dirección en línea " + (data.indexOf(address) + 2) + " guardado")
                          } 
                        }
                        , (error) => {
                           console.log("Dirección en línea " + (data.indexOf(address) + 2) + " contiene errores")
                           addressWrong.push(data.indexOf(address) + 2)
                        })
                      } else {
                        addressWrong.push(data.indexOf(address))
                      }
                    }
                  });
                break;
                default:
                  break;
              }
            })
            if(workersWrong.length > 0 || contractsWrong.length > 0 || addressWrong.length > 0 ){
              setTimeout(() =>{ 
                var info : string = this.infoWhereIsWrong(workersWrong, contractsWrong, addressWrong)
                this.showSnackBarWarning("updateFile", "Algunas lineas del fichero no se han podído cargar por errores en sus datos , las líneas son : " + info)
              }, 50)
            } else {
              this.showSnackBar("updateFile", "Fichero cargado con exito. Presione actualizar para ver las importaciones")
            }
          } else {
            this.showSnackBarError("updateFile", "Revise que las hojas del fichero estan correctas")
          }
        }
      } else {
        this.showSnackBarError("updateFile", "Formato de archivo no admitido. Tiene que ser xlsx")
      }

    } else {
      this.showSnackBarError("updateFile", "Subida de archivo cancelada")
    }
  }

  showSnackBar(acctionDone:string, message: string){
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration : 3250,
      panelClass: ['green-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
      
      data:{
        messageSnackbar: message,
        acctionDoneSnackbar : acctionDone
      } 
    })
  }

  showSnackBarWarning(acctionDone:string, message: string){
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration : 4750,
      panelClass: ['yellow-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
      
      data:{
        messageSnackbar: message,
        acctionDoneSnackbar : acctionDone
      } 
    })
  }

  showSnackBarError(acctionDone:string, message: string){
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration : 3250,
      panelClass: ['red-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data:{
        messageSnackbar: message,
        acctionDoneSnackbar : acctionDone
      } 
    })
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
