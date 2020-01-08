import { BusService } from '@services/bus/bus.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IBus } from '@models/bus';
import { IStation } from '@models/station';
import { StationService } from '@services/station/station.service';
import { BusFormComponent } from './components/bus-form/bus-form.component';
import { IBusFilter } from '@models/bus-filter';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private busService: BusService, private stationService: StationService, private toastr: ToastrService) {}

  public async registerBus(busValue: IBus): Promise<void> {
    try {
      console.log(busValue);
      this.isLoadingRegisterBus = true;
      await this.busService.registerBus(busValue);
      this.getBusList();
      this.busFormComponent.resetForm();
    } catch (e) {
      console.error('Error registering bus');
      this.toastr.error('There was an error registering the bus', 'Sorry');
    }
    this.isLoadingRegisterBus = false;
  }

  public filter(filter: IBusFilter): void {
    this.getBusList(0, filter);
  }

  public changePage(page: number): void {
    this.getBusList(page);
  }

  public async deleteBus(busId: number): Promise<void> {
    try {
      await this.busService.removeBus(busId);
      this.toastr.success('Bus removed with success', 'Success');
      this.getBusList();
    } catch (e) {
      console.error('Error removing bus', e);
      this.toastr.error('There was an error removing the bus', 'Sorry');
    }
  }

  public showWarningInvalidForm(): void {
    this.toastr.warning('The form is not valid, please verify all fields', 'Warning');
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
      this.toastr.error('There was an error getting the bus list', 'Sorry');
    }
    this.isLoadingList = false;
  }

  private async getStationList(): Promise<void> {
    try {
      this.isLoadingStations = true;
      const { stations } = await this.stationService.getStations();
      this.stationList = stations;
    } catch (e) {
      console.error('Error getting staionList', e);
      this.toastr.error('There was an error getting the station list', 'Sorry');
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
