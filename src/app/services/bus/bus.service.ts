import { IBus, BusType } from './../../models/bus';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  constructor(private httpClient: HttpClient) {}

  public getBuses(page: number = 1): Promise<{ totalBuses: number; buses: IBus[] }> {
    const params = new HttpParams({
      fromObject: {
        _page: String(page),
        _limit: String(6),
      },
    });

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

  public registerBus(bus: IBus): Promise<any> {
    return this.httpClient
      .post(`${environment.apiUrl}/buses`, bus)
      .pipe(delay(500))
      .toPromise();
  }

  public getBusTypes(): any {
    return Object.keys(BusType).map(key => BusType[key]);
  }
}
