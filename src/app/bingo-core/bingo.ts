import { LETTER_BINGO, STATE_NUMERO, TIPO_JUEGO, TYPE_BINGO } from './enums';
import { ConfBINGO } from './interfaces';
import { Probabilidad } from './models/probabilidad';
import { NumeroBingo } from './numeroBingo';
import { INDICESBINGO, INDICES_FRIENDLY_BINGO } from './tipoJuego';

export class Bingo {
  typeBingo: TYPE_BINGO; //typeof TYPE_BINGO = TYPE_BINGO;
  codigo: string = '';
  numeros: NumeroBingo[] = [];
  private _bingoJugadas: TIPO_JUEGO[] = [];
  probalidades: Probabilidad[] = []
  /*letraB: NumeroBingo[] = [];
  letraI: NumeroBingo[] = [];
  letraN: NumeroBingo[] = [];
  letraG: NumeroBingo[] = [];
  letraO: NumeroBingo[] = [];*/
  private _configuracion: ConfBINGO ={
    B: '1-15', // separada por guion
    I: '16-30',
    N: '31-45',
    G: '46-60',
    O: '61-75',
  };

  get configuracion(): ConfBINGO{
    return this._configuracion
  }
  set configuracion(configuracion: ConfBINGO){
    this._configuracion = configuracion
  }
  constructor(type: TYPE_BINGO, codigo: string) {
    this.typeBingo = type;
    this.codigo = codigo;
  }

  get bingoJugadas(): TIPO_JUEGO[] {
    return this._bingoJugadas;
  }
  set bingoJugadas(jugadas: TIPO_JUEGO[]) {
    this._bingoJugadas = jugadas;
  }
  sample() {}

  toString(): string{
    let allText=''
    if (this.typeBingo == TYPE_BINGO.MINI) {
      this.numeros.forEach((numero: NumeroBingo) => {
        console.log(`(${numero})`);
      });
    } else {
      allText+=`B\t I\t N\t G\t O\n`;
      for (let i = 0; i < 5; i++) {
        allText+=
          `${!!this.numeros[i]? this.numeros[i]:'-'}\t${!!this.numeros[i + 5]? this.numeros[i + 5]: '-'}\t${
            !!this.numeros[i + 10]? this.numeros[i + 10]:'-'
          }\t${!!this.numeros[i + 15]?this.numeros[i + 15]:'-'}\t${!!this.numeros[i + 20]?this.numeros[i + 20]:'-'}\n`
        ;
      }
    }
    return allText
  }
  print() {
    console.log('CODIGO DE TABLA: ' + this.codigo);
    if (this.typeBingo == TYPE_BINGO.MINI) {
      this.numeros.forEach((numero: NumeroBingo) => {
        console.log(`(${numero})`);
      });
    } else {
      console.log(`B\t I\t N\t G\t O`);
      for (let i = 0; i < 5; i++) {
        let indice = 0;
        console.log(
          `${this.numeros[i]}\t${this.numeros[i + 5]}\t${
            this.numeros[i + 10]
          }\t${this.numeros[i + 15]}\t${this.numeros[i + 20]}`
        );
      }
    }

    console.log('________________________');
  }
  _isInRange(number: number, min: number, max: number): boolean {
    return number >= min && number <= max;
  }
  /**
   * 1-75
   * 0 = vacio
   * X = central
   */
  addNumero(numero: string): void {
    let size: number = this.numeros.length;
    if (this.typeBingo == TYPE_BINGO.MINI) {
      this.numeros.push(
        new NumeroBingo(+numero, STATE_NUMERO.UNCHECK, LETTER_BINGO.EMPTY, '33')
      );
    }
    if (
      this.typeBingo == TYPE_BINGO.NUMERO ||
      this.typeBingo == TYPE_BINGO.TABLON ||
      this.typeBingo == TYPE_BINGO.SIGNO
    ) {
      //si. es 0 = al numro central
      if (numero.toLowerCase() == '0') {
        this.numeros.push(
          new NumeroBingo(0, STATE_NUMERO.CENTRAL, LETTER_BINGO.N, '33')
        );
        return;
      }
      //si es -1 entonces es vacio
      if (numero == '+' || numero == '-1') {
        debugger
        this.numeros.push(
          new NumeroBingo(-1, STATE_NUMERO.EMPTY, LETTER_BINGO.EMPTY, '-1')
        );
        return;
      }
      //Si esta dentro de la B
      if (
        this._isInRange(
          +numero,
          +this.configuracion.B.split('-')[0],
          +this.configuracion.B.split('-')[1]
        )
      ) {
        this.numeros.push(
          new NumeroBingo(
            +numero,
            STATE_NUMERO.UNCHECK,
            LETTER_BINGO.B,
            INDICESBINGO[size]
          )
        );
      }
      //Si esta dentro de la I
      if (
        this._isInRange(
          +numero,
          +this.configuracion.I.split('-')[0],
          +this.configuracion.I.split('-')[1]
        )
      ) {
        this.numeros.push(
          new NumeroBingo(
            +numero,
            STATE_NUMERO.UNCHECK,
            LETTER_BINGO.I,
            INDICESBINGO[size]
          )
        );
      }
      //Si esta dentro de la N
      if (
        this._isInRange(
          +numero,
          +this.configuracion.N.split('-')[0],
          +this.configuracion.N.split('-')[1]
        )
      ) {
        this.numeros.push(
          new NumeroBingo(
            +numero,
            STATE_NUMERO.UNCHECK,
            LETTER_BINGO.N,
            INDICESBINGO[size]
          )
        );
      }
      //Si esta dentro de la G
      if (
        this._isInRange(
          +numero,
          +this.configuracion.G.split('-')[0],
          +this.configuracion.G.split('-')[1]
        )
      ) {
        this.numeros.push(
          new NumeroBingo(
            +numero,
            STATE_NUMERO.UNCHECK,
            LETTER_BINGO.G,
            INDICESBINGO[size]
          )
        );
      }
      //Si esta dentro de la O
      if (
        this._isInRange(
          +numero,
          +this.configuracion.O.split('-')[0],
          +this.configuracion.O.split('-')[1]
        )
      ) {
        this.numeros.push(
          new NumeroBingo(
            +numero,
            STATE_NUMERO.UNCHECK,
            LETTER_BINGO.O,
            INDICESBINGO[size]
          )
        );
      }
    }
  }
  /**
   *
   *
   */

  checkNumber(numberPlayed: Number): NumeroBingo | null {
    this.numeros = this.numeros.map(numeroBingo => {
      numeroBingo.isLast = false;
      return numeroBingo
    })
    let numero: NumeroBingo | undefined = this.numeros.find(
      (numero: NumeroBingo) => {
        return numero.numero === numberPlayed;
      }
    );
    if (!!numero) {
      numero.state = STATE_NUMERO.CHECK;
      numero.isLast = true
      return numero;
    }
    return null;
  }

  unCheckNumber(numberPlayed: Number): NumeroBingo | null {
    let numero: NumeroBingo | undefined = this.numeros.find(
      (numero: NumeroBingo) => {
        return numero.numero === numberPlayed;
      }
    );
    if (!!numero) {
      numero.state = STATE_NUMERO.UNCHECK;
      return numero;
    }
    return null;
  }

  obtenerNumeroByIndexFriendlyList(indexList: string[]): NumeroBingo[] {
    //
    return this.numeros.filter((numero: NumeroBingo) => {
      return indexList.includes(numero.indexFriendly);
    });
  }
  agregarBingo(jugada: TIPO_JUEGO) {
    this._bingoJugadas.push(jugada);
    //Eliminar duplicados
    this._bingoJugadas = [...new Set(this._bingoJugadas)];
  }
  toJSON() {
    return {
      typeBingo: this.typeBingo,
      codigo: this.codigo,
      numeros: this.numeros.map((numero) => numero.numero),
    };
  }

  /**
   * Esto es verificar que todos los numeros esten llenos
   * @param jugada 
   * @param jugadas 
   * @returns 
   */
  verificarBingo(jugada: TIPO_JUEGO, jugadas: any):boolean{
  //  console.log('SIN forma de verificar bingo')
    let isBingo: boolean = false;
    let existeALgunUncheck = this.numeros.find((number: NumeroBingo) => {
      return number.state === STATE_NUMERO.UNCHECK;
    });
    debugger;
    if (!existeALgunUncheck) {
      isBingo = true;

     /* if (tabla.typeBingo == TYPE_BINGO.NUMERO) {
        tabla.agregarBingo(TIPO_JUEGO.NUMERO);
      }
      if (tabla.typeBingo == TYPE_BINGO.SIGNO) {
        tabla.agregarBingo(TIPO_JUEGO.SIGNO);
      }*/
      //if (tabla.typeBingo == TYPE_BINGO.MINI) {
        this.agregarBingo(jugada);
     // }
    }
    return isBingo;
  }
}
