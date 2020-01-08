import { StationFormComponent } from './station-form/station-form.component';
import { IBus } from '@models/bus';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StationService } from '@services/station/station.service';
import { IStation } from '@models/station';
import { BusService } from '@services/bus/bus.service';
import { ICreateStationPayload } from '@models/create-station-payload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss'],
})
export class StationComponent implements OnInit {
  public stationList: IStation[] = [];
  public isLoadingStationList: boolean = false;
  public busTypes: string[] = [];
  public isLoadingRegisterStation: boolean = false;
  public totalPages: number = 0;
  @ViewChild(StationFormComponent, { static: true }) stationFormComponent: StationFormComponent;
  constructor(private stationServie: StationService, private busService: BusService, private toastr: ToastrService) {}

  public async registerStation(payload: ICreateStationPayload): Promise<void> {
    this.isLoadingRegisterStation = true;
    const { station, buses } = payload;
    const stationId = await this.doRegisterStation(station);
    await this.registerBuses(buses, stationId);
    this.stationFormComponent.resetForm();
    this.toastr.success('Registered with success');
    this.isLoadingRegisterStation = false;
    this.getStationList();
  }

  public changePage(page: number): void {
    this.getStationList(page);
  }

  public showWarningStationForm(): void {
    this.toastr.warning('The form is not valid, please verify all fields', 'Warning');
  }

  private async registerBuses(buses: Partial<IBus>[], stationId: number): Promise<void> {
    try {
      const busesPromises = buses
        .map(bus => {
          bus.stationId = stationId;
          return bus;
        })
        .map(bus => this.busService.registerBus(bus));
      await Promise.all(busesPromises);
    } catch (e) {
      this.toastr.error('There was an error registering buses', 'Sorry');
      console.error('Error registering buses with station', e);
    }
  }

  private async doRegisterStation(station: Partial<IStation>): Promise<number> {
    try {
      const result = await this.stationServie.registerStations(station);
      return result.id;
    } catch (e) {
      this.toastr.error('There was an error registering the station', 'Sorry');
      console.error('Error registering station');
    }
  }

  private async getStationList(page = 1): Promise<void> {
    try {
      if (page === 1) {
        this.isLoadingStationList = true;
      }
      const { stations, totalStations } = await this.stationServie.getStations(page);
      this.stationList = stations;
      this.totalPages = Math.ceil(totalStations / 6);
    } catch (e) {
      console.error('Error getting station list', e);
      this.toastr.error('There was an error to get the stations list', 'Sorry');
    }
    this.isLoadingStationList = false;
  }

  private getBusTypes(): void {
    this.busTypes = this.busService.getBusTypes();
  }

  ngOnInit() {
    this.getBusTypes();
    this.getStationList();
  }
}
