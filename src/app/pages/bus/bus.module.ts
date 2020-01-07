import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusComponent } from './bus.component';
import { BusListComponent } from './components/bus-list/bus-list.component';
import { BusFormComponent } from './components/bus-form/bus-form.component';
import { BusFilterComponent } from './components/bus-filter/bus-filter.component';
import { PagerModule } from 'src/app/modules/pager/pager.module';

const routes: Routes = [
  {
    path: '',
    component: BusComponent,
  },
];

@NgModule({
  declarations: [BusComponent, BusListComponent, BusFormComponent, BusFilterComponent],
  imports: [RouterModule.forChild(routes), CommonModule, PagerModule],
})
export class BusModule {}
