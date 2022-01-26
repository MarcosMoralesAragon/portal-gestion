import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create/create.component';
import { ContractListComponent } from './components/list/contract-list/contract-list.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  { path : 'list', component: ListComponent},
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'create', component: CreateComponent},
  { path: 'create-contract/:id', component: CreateComponent},
  { path: 'list-contracts', component: ContractListComponent},
  { path: 'list-contracts/:id', component: ContractListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
