import { Component, OnInit, Input } from '@angular/core';
import { IBus } from 'src/app/models/bus';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.scss'],
})
export class BusListComponent implements OnInit {
  @Input() busList: IBus[] = [];
  constructor() {}

  ngOnInit() {}
}
