import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BusComponent } from './bus.component';
import { BusListComponent } from './components/bus-list/bus-list.component';
import { BusFormComponent } from './components/bus-form/bus-form.component';
import { BusFilterComponent } from './components/bus-filter/bus-filter.component';
import { PagerModule } from 'src/app/modules/pager/pager.module';
import { LoadingModule } from 'src/app/modules/loading/loading.module';
import { ButtonModule } from 'src/app/modules/button/button.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const routes: Routes = [
  {
    path: '',
    component: BusComponent,
  },
];

@NgModule({
  declarations: [BusComponent, BusListComponent, BusFormComponent, BusFilterComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagerModule,
    LoadingModule,
    ButtonModule,
    NgMultiSelectDropDownModule,
  ],
})
export class BusModule {}
