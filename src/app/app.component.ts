import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'portal-gestion';
  fileName = ""

  constructor(private router:Router,
              private http:HttpClient,
              private _snackBar: MatSnackBar){}

  onFileSelected(event : any) {

    const file:File = event.target.files[0];

    if (file) {
        this.fileName = file.name;
        console.log(this.fileName)
        this.showSnackBar("updateFile", "Archivo (" + this.fileName +  ") subido correctamente")
        // const formData = new FormData();
        // formData.append("thumbnail", file);
        // const upload$ = this.http.post("/api/thumbnail-upload", formData);
        // upload$.subscribe();
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

  goToList(){
    this.router.navigateByUrl('/')
  }
}
