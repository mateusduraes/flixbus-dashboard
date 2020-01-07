import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bus-filter',
  templateUrl: './bus-filter.component.html',
  styleUrls: ['./bus-filter.component.scss'],
})
export class BusFilterComponent implements OnInit {
  @Output() busFilterChange: EventEmitter<any> = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}
}
