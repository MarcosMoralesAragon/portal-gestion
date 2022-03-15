import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsRoutingModule } from './components-routing.module';
import { BinComponent } from './bin/bin.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { CreateComponent } from './create/create/create.component';
import { DialogCreateAddressComponent } from './dialog/dialog-create-address/dialog-create-address.component';
import { DialogCreateContractComponent } from './dialog/dialog-create-contract/dialog-create-contract.component';
import { DialogDeleteComponent } from './dialog/dialog-delete/dialog-delete.component';
import { DialogEditAddressComponent } from './dialog/dialog-edit-address/dialog-edit-address.component';
import { DialogEditContractComponent } from './dialog/dialog-edit-contract/dialog-edit-contract.component';
import { DialogEditComponent } from './dialog/dialog-edit/dialog-edit.component';
import { ListComponent } from './list/list.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule } from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    DialogDeleteComponent,
    SnackbarComponent,
    ContractListComponent,
    DialogEditComponent,
    DialogCreateContractComponent,
    DialogEditContractComponent,
    DialogEditAddressComponent,
    DialogCreateAddressComponent,
    BinComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCardModule,
    MatStepperModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    OverlayModule,
    ScrollingModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCardModule,
    MatStepperModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    DialogEditComponent,
    DialogCreateContractComponent,
    DialogEditContractComponent
  ],
  entryComponents: [
    DialogEditComponent,
    DialogCreateContractComponent,
    DialogEditContractComponent
  ]
})
export class ComponentsModule { }
