import { IBusFilter } from './../../models/bus-filter';
import { IBusFilter } from 'src/app/models/bus-filter';
import { IBus, BusType } from './../../models/bus';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  constructor(private httpClient: HttpClient) {}

  private getBusFilters(page: number, filter: IBusFilter): HttpParams {
    let params = new HttpParams({
      fromObject: {
        _page: String(page),
        _limit: String(6),
      },
    });

    if (filter) {
      filter.stations.forEach(station => {
        params = params.append('stationId', String(station.id));
      });
      filter.busTypes.forEach(type => {
        params = params.append('type', type);
      });
    }

    if (filter && filter.plate) {
      params = params.append('plate', filter.plate);
    }
    return params;
  }

  public getBuses(page: number = 1, filter?: IBusFilter): Promise<{ totalBuses: number; buses: IBus[] }> {
    const params = this.getBusFilters(page, filter);

    return this.httpClient
      .get<IBus[]>(`${environment.apiUrl}/buses`, { observe: 'response', params })
      .pipe(
        delay(500),
        map((response: HttpResponse<IBus[]>) => {
          const totalBuses = Number(response.headers.get('X-Total-Count'));
          return { totalBuses, buses: response.body };
        }),
      )
      .toPromise();
  }

  public registerBus(bus: Partial<IBus>): Promise<any> {
    return this.httpClient
      .post(`${environment.apiUrl}/buses`, bus)
      .pipe(delay(500))
      .toPromise();
  }

  public getBusTypes(): any {
    return Object.keys(BusType).map(key => BusType[key]);
  }
}
