import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BinComponent } from './bin/bin.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { CreateComponent } from './create/create/create.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path :'list', component: ListComponent},
  { path: 'create', component: CreateComponent},
  { path: 'list-contracts/:id', component: ContractListComponent},
  { path: 'bin', component : BinComponent},
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
