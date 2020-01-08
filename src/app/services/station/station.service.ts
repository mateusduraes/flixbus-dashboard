import { delay, map } from 'rxjs/operators';
import { IBus } from '@models/bus';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStation } from '@models/station';
import { environment } from '@env/environment';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  constructor(private httpClient: HttpClient) {}

  public getStations(page: number = 1): Promise<{ totalStations: number; stations: IStation[] }> {
    const params = new HttpParams({
      fromObject: {
        _page: String(page),
        _limit: String(6),
      },
    });

    return forkJoin(
      this.httpClient
        .get<IStation[]>(`${environment.apiUrl}/stations`, { observe: 'response', params })
        .pipe(delay(500)),
      this.httpClient.get<IBus[]>(`${environment.apiUrl}/buses`).pipe(delay(500)),
    )
      .pipe(
        map(([stationsResponse, buses]: [HttpResponse<IStation[]>, IBus[]]) => {
          const totalStations = Number(stationsResponse.headers.get('X-Total-Count'));
          const stations = stationsResponse.body.map(station => {
            const countBuses = buses.filter(bus => bus.stationId === station.id).length;
            station.availableSlots = station.countSlots - countBuses;
            return station;
          });
          return { totalStations, stations };
        }),
      )
      .toPromise();
  }

  public registerStations(station: Partial<IStation>): Promise<any> {
    console.log('station to reg', station);
    return this.httpClient.post(`${environment.apiUrl}/stations`, station).toPromise();
  }
}
