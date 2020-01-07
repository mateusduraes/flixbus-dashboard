import { delay, map } from 'rxjs/operators';
import { IBus } from './../../models/bus';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStation } from 'src/app/models/station';
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  constructor(private httpClient: HttpClient) {}

  public getStations(): Promise<IStation[]> {
    return forkJoin(
      this.httpClient.get<IStation[]>(`${environment.apiUrl}/stations`).pipe(delay(500)),
      this.httpClient.get<IBus[]>(`${environment.apiUrl}/buses`).pipe(delay(500)),
    )
      .pipe(
        map(([stations, buses]: [IStation[], IBus[]]) => {
          return stations.map(station => {
            const countBuses = buses.filter(bus => bus.stationId === station.id).length;
            station.availableSlots = station.countSlots - countBuses;
            return station;
          });
        }),
      )
      .toPromise();
  }

  public registerStations(station: IStation, buses: IBus[] = []): Promise<any> {
    return this.httpClient.post(`${environment.apiUrl}/stations`, station).toPromise();
  }
}
