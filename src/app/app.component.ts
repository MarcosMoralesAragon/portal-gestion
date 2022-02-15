import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { FileService } from './services/file/file.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'portal-gestion';

  constructor(private router:Router,
              private http:HttpClient,
              private _snackBar: MatSnackBar,
              private fileService : FileService){}
  
  onFileSelected(event : any) {

    // Saca el archivo introducido
    const file:File = event.target.files[0];

    if (file) {
      if(this.getFileExtension(file.name) === "xlsx"){

        // Objeto que nos permite leer el archivo
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(file)

        fileReader.onload = (event:any) => {
          // Saca los datos y lo vuelve un binario
          let binaryData = event.target.result
          // Crea un objeto con todos los datos del xlsx que le hemos pasado
          let workbook = XLSX.read(binaryData,{type:'binary'})

          // Por cada hoja del xlsx lo combierte a un json los datos de las columnas
          workbook.SheetNames.forEach(sheet => {
            // Hace json la hoja sheet
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])

            switch (sheet) {
              case "Empleado":
                console.log("Esta en empleado")
                break;
              case "Contrato":
                console.log("Esta en contrato")
                break;
              case "Dirección":
                console.log("Esta en dirección")
              break;
              default:
                break;
            }
            console.log(data)
          })
          console.log(workbook)
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
    return fileName.split('.')[1]
  }

  goToList(){
    this.router.navigateByUrl('/')
  }
}
