import { Bingo } from "./bingo";
import { STATE_NUMERO, TIPO_JUEGO, TYPE_BINGO } from "./enums";
import { NumeroBingo } from "./numeroBingo";

class BingoNumero extends Bingo{
  constructor(codigo: string){
    super(TYPE_BINGO.NUMERO, codigo);
  }


  override verificarBingo(jugada: TIPO_JUEGO, jugadas: any):boolean{
    let isBingo: boolean = false;
    let existeALgunUncheck = this.numeros.find((number: NumeroBingo) => {
      return number.state === STATE_NUMERO.UNCHECK;
    });
    debugger;
    if (!existeALgunUncheck) {
      isBingo = true;

     // if (tabla.typeBingo == TYPE_BINGO.NUMERO) {
        this.agregarBingo(TIPO_JUEGO.TABLAS_NUMERO);
    //  }
     /* if (tabla.typeBingo == TYPE_BINGO.SIGNO) {
        tabla.agregarBingo(TIPO_JUEGO.SIGNO);
      }
      if (tabla.typeBingo == TYPE_BINGO.MINI) {
        tabla.agregarBingo(TIPO_JUEGO.MINI);
      }*/
    }
    return isBingo;
  }
}