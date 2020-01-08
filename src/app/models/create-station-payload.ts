import { IBus } from './bus';
import { IStation } from './station';

export interface ICreateStationPayload {
  station: Partial<IStation>;
  buses: Partial<IBus>[];
}
