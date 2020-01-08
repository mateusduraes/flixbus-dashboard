import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { IStation } from 'src/app/models/station';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IBusFilter } from 'src/app/models/bus-filter';

@Component({
  selector: 'app-bus-filter',
  templateUrl: './bus-filter.component.html',
  styleUrls: ['./bus-filter.component.scss'],
})
export class BusFilterComponent implements OnInit {
  @Output() busFilterChange: EventEmitter<IBusFilter> = new EventEmitter<IBusFilter>();
  @Input() stationList: IStation[] = [];
  @Input() busTypes: string[] = [];
  busPlateChanged: Subject<string> = new Subject<string>();
  busPlate: string = '';
  busTypesSettings: any = {};
  stationListSettings: any = {};
  selectableBusTypes = [];
  selectedBusTypes = [];
  selectedStations = [];

  constructor() {}

  public emitFilterChange(): void {
    this.busFilterChange.emit({
      stations: [...this.selectedStations],
      busTypes: [...this.selectedBusTypes],
      plate: this.busPlate,
    });
  }

  public onFieldChange(query: string) {
    this.busPlateChanged.next(query);
  }

  ngOnInit() {
    this.stationList = this.stationList.map(station => {
      station.aliasName = `Station ${station.id}`;
      return station;
    });
    this.selectableBusTypes = this.busTypes.map((busType, index) => ({ busType, id: index }));
    this.stationListSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'aliasName',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      enableCheckAll: false,
    };

    this.busTypesSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'busType',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      enableCheckAll: false,
    };

    this.busPlateChanged.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(model => {
      this.busPlate = model;
      this.emitFilterChange();
    });
  }
}
