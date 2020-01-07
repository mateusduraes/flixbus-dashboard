export interface IBus {
  id: number;
  type: BusType;
  plate: string;
  stationId: number;
}

export enum BusType {
  REGULAR = 'Regular',
  DOUBLEDECKER = 'Doubledecker',
  MINIBUS = 'MiniBus',
  HYBRIDBUS = 'HybridBus',
}
