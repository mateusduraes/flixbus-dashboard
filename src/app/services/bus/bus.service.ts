import { IBus, BusType } from './../../models/bus';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  constructor(private httpClient: HttpClient) {}

  public getBuses(): Promise<IBus[]> {
    return this.httpClient
      .get<IBus[]>(`${environment.apiUrl}/buses`)
      .pipe(delay(500))
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
