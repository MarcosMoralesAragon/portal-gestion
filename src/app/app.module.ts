import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create/create.component';
import { DialogDeleteComponent } from './components/dialog/dialog-delete/dialog-delete.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { DialogEditComponent } from './components/dialog/dialog-edit/dialog-edit.component';
import { ContractListComponent } from './components/list/contract-list/contract-list.component';
import { DialogCreateContractComponent } from './components/dialog/dialog-create-contract/dialog-create-contract.component';

import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import { DialogEditContractComponent } from './components/dialog/dialog-edit-contract/dialog-edit-contract.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    DialogDeleteComponent,
    DialogEditComponent,
    SnackbarComponent,
    ContractListComponent,
    DialogCreateContractComponent,
    DialogEditContractComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    FormsModule,
    MatNativeDateModule,
    MatCardModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
