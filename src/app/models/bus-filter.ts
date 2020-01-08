export interface IBusFilter {
  stations: { id: number; aliasName: string }[];
  busTypes: string[];
  plate: string;
}
