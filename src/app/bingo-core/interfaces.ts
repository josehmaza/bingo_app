export interface JSONDATA {
  hojas: HojaJson[];
}

export interface HojaJson {
  nombre: string;
  tablasDeBingo: BingoJson[];
}

export interface BingoJson {
  typeBingo: string;
  codigo: string;
  numeros: number[];
}
export interface ConfBINGO{
  B: string,
  I: string,
  N: string,
  G: string,
  O: string,
}
