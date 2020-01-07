import { BusService } from './../../services/bus/bus.service';
import { Component, OnInit } from '@angular/core';
import { IBus } from 'src/app/models/bus';
import { IStation } from 'src/app/models/station';
import { StationService } from 'src/app/services/station/station.service';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss'],
})
export class BusComponent implements OnInit {
  public busList: IBus[] = [];
  public isLoadingList: boolean = true;
  public stationList: IStation[] = [];
  public busTypes: string[] = [];

  constructor(private busService: BusService, private stationService: StationService) {}

  public registerBus(busValue): void {
    console.log(busValue);
  }

  public filter(filter: any): void {}

  public changePage(page: number): void {}

  private async getBusList(): Promise<void> {
    try {
      this.isLoadingList = true;
      this.busList = await this.busService.getBuses();
    } catch (e) {
      console.error('Error getting busList', e);
      // Handle error, show to the user
    }
    this.isLoadingList = false;
  }

  private async getStationList(): Promise<void> {
    try {
      this.stationList = await this.stationService.getStations();
      console.log('this.stationList', this.stationList);
    } catch (e) {
      console.error('Error getting staionList', e);
      // Handle error, show to the user
    }
  }

  private getBusTypes(): void {
    this.busTypes = this.busService.getBusTypes();
    console.log('this.busTypes', this.busTypes);
  }

  ngOnInit() {
    this.getStationList();
    this.getBusList();
    this.getBusTypes();
  }
}
