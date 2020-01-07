import { IBus } from './../../models/bus';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  constructor(private httpClient: HttpClient) {}

  public getBuses(): Observable<IBus[]> {
    return this.httpClient.get<IBus[]>(`${environment.apiUrl}/buses`);
  }

  public registerBus(bus: IBus): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/buses`, bus);
  }
}
