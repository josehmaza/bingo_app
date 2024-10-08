import { Bingo } from './bingo';
import { bingoConstants } from './bingoConstants';
import { STATE_NUMERO, TIPO_JUEGO, TYPE_BINGO } from './enums';
import { NumeroBingo } from './numeroBingo';

export const JUGADAS: any = {
  LLENA: [],
  NUMERO:[],
  DIAGONAL: [
    [11, 22, 44, 55],
    [51, 42, 24, 15],
  ],
  //LETTERS
  A: [[11, 21, 31, 41, 51, 12, 13, 14, 15, 25, 35, 45, 55, 32, 34]],
  B: [[11, 21, 31, 41, 51, 12, 13, 14, 15, 25, 45, 55, 54, 53, 52, 34, 32]],
  C: [[11, 21, 31, 41, 51, 12, 13, 14, 15, 52, 53, 54, 55]],
  D: [[11, 12, 13, 14, 25, 35, 45, 51, 52, 53, 54, 22, 32, 42]],
  D_GORDO: [[12,13,14,52,53,54,25,35,45,22,32,42]],
  E: [[11, 21, 31, 41, 51, 12, 13, 14, 15, 32, 34, 35, 52, 53, 54, 55]],
  F: [[11, 21, 31, 41, 51, 12, 13, 14, 15, 32, 34, 35]],
  G: [[11, 21, 31, 41, 51, 12, 13, 14, 15, 52, 53, 54, 55, 34, 35, 45]],
  H: [[11, 21, 31, 41, 51, 15, 25, 35, 45, 55, 32, 34]],
  I: [[11, 12, 13, 14, 15, 23, 43, 51, 52, 53, 54, 55]],
  J: [[11, 12, 13, 14, 15, 23, 43, 53, 41, 51, 52]],
  K: [[11, 21, 31, 41, 51, 32, 24, 44, 15, 55]],
  L: [[11, 21, 31, 41, 51, 52, 53, 54, 55]],
  LL_GORDO:[[11,21,31,41,51 ,52,14,24,34,44,54,55]],
  M: [[11, 21, 31, 41, 51, 22, 43, 24, 15, 25, 35, 45, 55]],
  N: [[11, 21, 31, 41, 51, 15, 25, 35, 45, 55, 22, 44]],
  O: [[11, 21, 31, 41, 51, 12, 13, 14, 15, 25, 35, 45, 55, 54, 53, 52]],
  P: [[11, 21, 31, 41, 51, 12, 13, 14, 15, 25, 35, 34, 32]],
  Q: [11,12,13,14,24,34,44,43,42,41,31,21,55],
  R: [[11, 21, 31, 41, 51, 12, 13, 14, 15, 25, 35, 55, 34, 44, 32]],
  R_GORDO: [[11,12,13,14,24,34,54,43,32,21,31,41,51]],
  S: [[11, 12, 13, 14, 15, 21, 31, 32, 34, 35, 45, 55, 54, 53, 52, 51]],
  S_GORDO: [[12,13,14,15,22,32,34,35,45,55,54,53,52]],
  T: [[11, 12, 13, 14, 15, 23, 43, 53]],
  U: [[11, 21, 31, 41, 51, 52, 53, 54, 55, 45, 35, 25, 15]],
  V: [[11, 21, 31, 42, 53, 44, 35, 35, 25, 15]],
  W: [[11, 21, 31, 41, 51, 42, 23, 44, 15, 25, 35, 45, 55]],
  X: [[11, 22, 44, 55, 15, 24, 42, 51]],
  Y: [[11, 21, 32, 43, 53, 34, 25, 15]],
  Z: [[11, 12, 13, 14, 15, 24, 42, 51, 52, 53, 54, 55]],
  VENTEY3_GORDO:[[11,12,22,32,31,41,51,52,14,15,25,35,45,55,34,54]],
  OCHO_GORDO:[[12,13,14,24,34,44,54,53,52,42,32,22]],
  TRES_GORDO:[[11,12,13,14,15,25,35,45,55,54,53,52,51,31,32,34]],
  DIEZ_GORDO:[[11,21,31,41,51,13,14,15,23,33,43,53,54,55,45,35,25,14,15]],
  FE_GORDO:[[11,21,31,41,51,12,32,14,24,34,44,54,15,35]]
};

export const INDICESBINGO: any = {
  '0': '11',
  '5': '12',
  '10': '13',
  '15': '14',
  '20': '15',
  '1': '21',
  '6': '22',
  '11': '23',
  '16': '24',
  '21': '25',
  '2': '31',
  '7': '32',
  '12': '33',
  '17': '34',
  '22': '35',
  '3': '41',
  '8': '42',
  '13': '43',
  '18': '44',
  '23': '45',
  '4': '51',
  '9': '52',
  '14': '53',
  '19': '54',
  '24': '55',
};
export const INDICES_FRIENDLY_BINGO = {
  '11': 0,
  '12': 5,
  '13': 10,
  '14': 15,
  '15': 20,
  '21': 1,
  '22': 6,
  '23': 11,
  '24': 16,
  '25': 21,
  '31': 2,
  '32': 7,
  '33': 12,
  '34': 17,
  '35': 22,
  '41': 3,
  '42': 8,
  '43': 13,
  '44': 18,
  '45': 23,
  '51': 4,
  '52': 9,
  '53': 14,
  '54': 19,
  '55': 24,
};

export class JUGADA {
  /**
   * Solo para tablones
   */
  static verificarJUEGO(tabla: Bingo, jugada: TIPO_JUEGO): boolean {
    debugger
    let esBingo = false;
    //jugadas.forEach((jugada: TIPO_JUEGO) => {*
    //if (Object.keys(JUGADAS).includes(jugada.toString())) {
    /**
     * Ejm Diagonal
     * jugadaARealizar = [11,22,44,55], [15,24,42,51]
     */
    switch (jugada) {
      case TIPO_JUEGO.TABLAS_NUMERO:
      case TIPO_JUEGO.TABLAS_SIGNO:
      case TIPO_JUEGO.TABLAS_MINI:
        return false;
    }
    let jugadaARealizar: number[][] = JUGADAS[jugada];
   
    /**
     * Checkear todos los indices
     *  */
    //Por cada forma de la jugada
    jugadaARealizar.forEach((jugadaR: number[]) => {
      let numbers: NumeroBingo[] = tabla.obtenerNumeroByIndexFriendlyList(
        jugadaR.map((number) => number.toString())
      );
      //checkear si estan chechados todos
      let existeALgunUncheck = numbers.find((number: NumeroBingo) => {
        return number.state === STATE_NUMERO.UNCHECK;
      });
      if (!existeALgunUncheck) {
        esBingo = true;
      }
      //Verificar probabilidad
      JUGADA.verificarProbabilidad(tabla, jugada, jugadaR)
    });
    if (esBingo) {
      tabla.agregarBingo(jugada);
    }
    return esBingo; //
  }
  //Valido para tablones

  static verificarProbabilidad(tabla: Bingo, jugada: TIPO_JUEGO, patrones: number[]){
    let numbers: NumeroBingo[] = []
    if(!patrones || patrones.length == 0){
      numbers = tabla.numeros.filter((number: NumeroBingo) => number.state !== STATE_NUMERO.CENTRAL && number.numero != bingoConstants.NUMEROS.EMPTY)
    }else{
      numbers = tabla.obtenerNumeroByIndexFriendlyList(
        patrones.map((number) => number.toString())
      );
    }

    let probabilidadPorBola: number  = 100/numbers.length
    let numbersCheck = numbers.filter(number => {
      return number.state === STATE_NUMERO.CHECK
    })
    tabla.probalidades.push({
      jugada: jugada,
      probalidad: Math.round(probabilidadPorBola*numbersCheck.length),
      numerosRestantes: (numbers.length-numbersCheck.length)
    })

  }
  /**
   * IDEAL  para
   * - Tabla de numeros
   * - Tabla de signos
   */
  static verificarTodoLleno(tabla: Bingo): boolean {
    let isBingo: boolean = false;
    let existeALgunUncheck = tabla.numeros.find((number: NumeroBingo) => {
      return number.state === STATE_NUMERO.UNCHECK;
    });
    debugger;
    JUGADA.verificarProbabilidad(tabla, TIPO_JUEGO.LLENA, [])
    if (!existeALgunUncheck) {
      isBingo = true;

      if (tabla.typeBingo == TYPE_BINGO.NUMERO) {
        tabla.agregarBingo(TIPO_JUEGO.TABLAS_NUMERO);
      }
      if (tabla.typeBingo == TYPE_BINGO.SIGNO) {
        tabla.agregarBingo(TIPO_JUEGO.TABLAS_SIGNO);
      }
      if (tabla.typeBingo == TYPE_BINGO.MINI) {
        tabla.agregarBingo(TIPO_JUEGO.TABLAS_MINI);
      }
      
    }
    return isBingo;
  }
}
