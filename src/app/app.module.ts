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
import { ContractListComponent } from './components/contract-list/contract-list.component';
import { DialogCreateContractComponent } from './components/dialog/dialog-create-contract/dialog-create-contract.component';
import { DialogEditAddressComponent } from './components/dialog/dialog-edit-address/dialog-edit-address.component';
import { DialogCreateAddressComponent } from './components/dialog/dialog-create-address/dialog-create-address.component';
import { BinComponent } from './components/bin/bin.component';

import {MatTableModule} from '@angular/material/table'
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
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import { HttpClientModule } from '@angular/common/http';

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
    DialogEditContractComponent,
    DialogEditAddressComponent,
    DialogCreateAddressComponent,
    BinComponent
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
    MatSortModule,
    MatExpansionModule,
    MatBadgeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
