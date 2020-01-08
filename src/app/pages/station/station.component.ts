import { StationFormComponent } from './station-form/station-form.component';
import { IBus } from './../../models/bus';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StationService } from 'src/app/services/station/station.service';
import { IStation } from 'src/app/models/station';
import { BusService } from 'src/app/services/bus/bus.service';
import { ICreateStationPayload } from 'src/app/models/create-station-payload';
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
      this.toastr.error('Sorry', 'There was an error registering buses');
      console.error('Error registering buses with station', e);
    }
  }

  private async doRegisterStation(station: Partial<IStation>): Promise<number> {
    try {
      const result = await this.stationServie.registerStations(station);
      return result.id;
    } catch (e) {
      this.toastr.error('Sorry', 'There was an error registering the station');
      console.error('Error registering station');
    }
  }

  private async getStationList(): Promise<void> {
    try {
      this.isLoadingStationList = true;
      this.stationList = await this.stationServie.getStations();
    } catch (e) {
      console.error('Error getting station list', e);
      this.toastr.error('Sorry', 'There was an error to get the stations list');
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
