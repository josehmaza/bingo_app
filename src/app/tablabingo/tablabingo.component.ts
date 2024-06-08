import { Component, Input, OnInit, inject } from '@angular/core';
import { NumeroBingo } from '../bingo-core/numeroBingo';
import { STATE_NUMERO, TIPO_JUEGO, TYPE_BINGO } from '../bingo-core/enums';
import { BingoService } from '../bingo-core/bingoservice';
import { JUGADA } from '../bingo-core/tipoJuego';
import { Probabilidad } from '../bingo-core/models/probabilidad';

@Component({
  selector: 'app-tablabingo',
  templateUrl: './tablabingo.component.html',
  styleUrls: ['./tablabingo.component.scss']
})
export class TABLABINGOComponent  implements OnInit {
  @Input()numerosBingo: NumeroBingo[] = []
  @Input() codigo?: string =''
  @Input() bingoJugadas: TIPO_JUEGO[] =[]
  @Input() typeBingo: TYPE_BINGO = TYPE_BINGO.TABLON
  @Input() masProbable?: Probabilidad
  STATE_NUMERO_TYPO= STATE_NUMERO
  bingoService = inject(BingoService)
  numerosBingoOrdenado?: {
    B?: NumeroBingo[],
    I?: NumeroBingo[],
    N?: NumeroBingo[],
    G?: NumeroBingo[],
    O?: NumeroBingo[],
  }={}
  constructor(){
    
  }
  ngOnInit(): void{
    console.log('=> ', this.numerosBingo)
    this.configurarNumLetras()
   /* this.bingoService.onLanzarNumeroSubject.subscribe((numeroS: number) => {
      /*this.numerosBingo = this.numerosBingo?.map((numeroBingo: NumeroBingo) => {
        if(numeroBingo.numero === numeroS){
          numeroBingo.state = STATE_NUMERO.CHECK
        }
        return numeroBingo
      })
      this.numerosBingoOrdenado = {
        B: this.numerosBingo?.filter(numero => numero.letter === 'B'),
        I: this.numerosBingo?.filter(numero => numero.letter === 'I'),
        N: this.numerosBingo?.filter(numero => numero.letter === 'N'),
        G: this.numerosBingo?.filter(numero => numero.letter === 'G'),
        O: this.numerosBingo?.filter(numero => numero.letter === 'O'),
      }
    })*/

  }
  configurarNumLetras(){
    this.numerosBingoOrdenado = {
        B: this.numerosBingo?.filter(numero => numero.letter === 'B'),
        I: this.numerosBingo?.filter(numero => numero.letter === 'I'),
        N: this.numerosBingo?.filter(numero => numero.letter === 'N'),
        G: this.numerosBingo?.filter(numero => numero.letter === 'G'),
        O: this.numerosBingo?.filter(numero => numero.letter === 'O'),
      }
    if(this.typeBingo === TYPE_BINGO.NUMERO || this.typeBingo === TYPE_BINGO.SIGNO){
      this.numerosBingoOrdenado = {
        B: [...this.numerosBingo.slice(0, 5)],
        I: [...this.numerosBingo.slice(5, 10)],
        N: [...this.numerosBingo.slice(10, 15)],
        G: [...this.numerosBingo.slice(15, 20)],
        O: [...this.numerosBingo.slice(20, 25)],
      }
    }
    debugger

  }

  
}
