import { LETTER_BINGO, STATE_NUMERO } from "./enums";


export class NumeroBingo {
  /**
   * NORMALMENTE un numero primero esta vacio, luego si sale pasa a check
   * si es el central siginifica que seria el numero central
   */
  numero: number = 0;
  state?: STATE_NUMERO; // = STATE_NUMERO.UNCHECK;
  letter?: LETTER_BINGO;
  indexFriendly: string = '';
  isLast:boolean = false
  constructor(
    numero: number,
    state: STATE_NUMERO,
    letter: LETTER_BINGO,
    indexFriendly: string
  ) {
    this.numero = numero;
    this.state = state;
    this.letter = letter;
    this.indexFriendly = indexFriendly;
  }
  public toString(): string {
    if (this.state == STATE_NUMERO.CENTRAL) {
      return '😊';
    }
    if (this.numero === -1) {
      return '+';
    }
    return `${this.numero}${this.state == STATE_NUMERO.CHECK ? '✓' : ''}`;
  }
  /* toJSON(): object {
    return {
      numero: this.numero,
      //letter: this.letter,
      //indexFriendly: this.indexFriendly,
    };
  }*/
}
