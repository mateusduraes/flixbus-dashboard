import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StationComponent } from './station.component';

const routes: Routes = [
  {
    path: '',
    component: StationComponent,
  },
];

@NgModule({
  declarations: [StationComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class StationModule {}
