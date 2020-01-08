import { BusService } from './../../services/bus/bus.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IBus } from 'src/app/models/bus';
import { IStation } from 'src/app/models/station';
import { StationService } from 'src/app/services/station/station.service';
import { BusFormComponent } from './components/bus-form/bus-form.component';
import { IBusFilter } from 'src/app/models/bus-filter';

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
  public totalPages: number = 0;
  public isLoadingStations: boolean = true;

  public isLoadingRegisterBus: boolean = false;
  @ViewChild(BusFormComponent, { static: true }) busFormComponent: BusFormComponent;

  constructor(private busService: BusService, private stationService: StationService) {}

  public async registerBus(busValue: IBus): Promise<void> {
    try {
      console.log(busValue);
      this.isLoadingRegisterBus = true;
      await this.busService.registerBus(busValue);
      this.getBusList();
      this.busFormComponent.resetForm();
    } catch (e) {
      console.error('Error registering bus');
      // handle the error, show something to the user
    }
    this.isLoadingRegisterBus = false;
  }

  public filter(filter: IBusFilter): void {
    this.getBusList(0, filter);
  }

  public changePage(page: number): void {
    this.getBusList(page);
  }

  private async getBusList(page = 1, params?: IBusFilter): Promise<void> {
    try {
      if (page === 1) {
        this.isLoadingList = true;
      }
      const { buses, totalBuses } = await this.busService.getBuses(page, params);
      this.busList = buses;
      this.totalPages = Math.ceil(totalBuses / 6);
    } catch (e) {
      console.error('Error getting busList', e);
      // Handle error, show to the user
    }
    this.isLoadingList = false;
  }

  private async getStationList(): Promise<void> {
    try {
      this.isLoadingStations = true;
      this.stationList = await this.stationService.getStations();
    } catch (e) {
      console.error('Error getting staionList', e);
      // Handle error, show to the user
    }
    this.isLoadingStations = false;
  }

  private getBusTypes(): void {
    this.busTypes = this.busService.getBusTypes();
  }

  ngOnInit() {
    this.getStationList();
    this.getBusList();
    this.getBusTypes();
  }
}
