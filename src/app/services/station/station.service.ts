import { IBus } from './../../models/bus';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStation } from 'src/app/models/station';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  constructor(private httpClient: HttpClient) {}

  public getStations(): Promise<IStation[]> {
    return this.httpClient.get<IStation[]>(`${environment.apiUrl}/stations`).toPromise();
  }

  public registerStations(station: IStation, buses: IBus[] = []): Promise<any> {
    return this.httpClient.post(`${environment.apiUrl}/stations`, station).toPromise();
  }
}
