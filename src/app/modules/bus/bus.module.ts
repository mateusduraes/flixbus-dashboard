import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusComponent } from './bus.component';

const routes: Routes = [
  {
    path: '',
    component: BusComponent,
  },
];

@NgModule({
  declarations: [BusComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class BusModule {}
