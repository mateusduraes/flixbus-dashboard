import { BusService } from './../../services/bus/bus.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss'],
})
export class BusComponent implements OnInit {
  constructor(private busService: BusService) {}

  ngOnInit() {
    this.busService.getBuses();
  }
}
