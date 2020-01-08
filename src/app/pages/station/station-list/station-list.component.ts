import { Component, OnInit, Input } from '@angular/core';
import { IStation } from '@models/station';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss'],
})
export class StationListComponent implements OnInit {
  @Input() stationList: IStation[] = [];
  constructor() {}

  ngOnInit() {}
}
