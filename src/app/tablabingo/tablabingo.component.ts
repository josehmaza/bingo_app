import { Component, Input, OnInit, inject } from '@angular/core';
import { NumeroBingo } from '../bingo-core/numeroBingo';
import { STATE_NUMERO } from '../bingo-core/enums';
import { BingoService } from '../bingo-core/bingoservice';

@Component({
  selector: 'app-tablabingo',
  templateUrl: './tablabingo.component.html',
  styleUrls: ['./tablabingo.component.scss']
})
export class TABLABINGOComponent  implements OnInit {
  @Input()numerosBingo?: NumeroBingo[] = []
  @Input() codigo?: string =''
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

  }

  
}
