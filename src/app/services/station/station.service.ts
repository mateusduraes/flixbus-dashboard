import { IBus } from './../../models/bus';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStation } from 'src/app/models/station';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  constructor(private httpClient: HttpClient) {}

  public getStations(): Observable<IStation[]> {
    return this.httpClient.get<IStation[]>(`${environment.apiUrl}/stations`);
  }

  public registerStations(station: IStation, buses: IBus[] = []): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/stations`, station);
  }
}
