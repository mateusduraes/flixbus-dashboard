import { IBus } from './../../models/bus';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  constructor(private httpClient: HttpClient) {}

  public getBuses(): Promise<IBus[]> {
    return this.httpClient.get<IBus[]>(`${environment.apiUrl}/buses`).toPromise();
  }

  public registerBus(bus: IBus): Promise<any> {
    return this.httpClient.post(`${environment.apiUrl}/buses`, bus).toPromise();
  }
}
