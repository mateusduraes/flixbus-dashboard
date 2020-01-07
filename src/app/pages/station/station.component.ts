import { Component, OnInit } from '@angular/core';
import { StationService } from 'src/app/services/station/station.service';
import { IStation } from 'src/app/models/station';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss'],
})
export class StationComponent implements OnInit {
  public stationList: IStation[] = [];
  public isLoadingStationList: boolean = false;
  constructor(private stationServie: StationService) {}

  private async getStationList(): Promise<void> {
    try {
      this.isLoadingStationList = true;
      this.stationList = await this.stationServie.getStations();
    } catch (e) {
      console.error('Error getting station list', e);
      // handle error
    }
    this.isLoadingStationList = false;
  }

  ngOnInit() {
    this.getStationList();
  }
}
