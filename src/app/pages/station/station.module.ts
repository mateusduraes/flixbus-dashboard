import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StationComponent } from './station.component';
import { StationListComponent } from './station-list/station-list.component';
import { StationFormComponent } from './station-form/station-form.component';
import { PagerModule } from 'src/app/modules/pager/pager.module';
import { LoadingModule } from 'src/app/modules/loading/loading.module';

const routes: Routes = [
  {
    path: '',
    component: StationComponent,
  },
];

@NgModule({
  declarations: [StationComponent, StationListComponent, StationFormComponent],
  imports: [CommonModule, RouterModule.forChild(routes), PagerModule, LoadingModule],
})
export class StationModule {}
