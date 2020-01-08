import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBus } from '@models/bus';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.scss'],
})
export class BusListComponent implements OnInit {
  @Input() busList: IBus[] = [];
  @Output() busListRemove: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  removeBus(bus: IBus) {
    this.busListRemove.next(bus.id);
  }

  ngOnInit() {}
}
