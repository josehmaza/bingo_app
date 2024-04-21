import { Component, inject } from '@angular/core';
import { STATE_NUMERO } from '../bingo-core/enums';
import { BingoService } from '../bingo-core/bingoservice';
import { NumeroBingo } from '../bingo-core/numeroBingo';
import { ConfBINGO } from '../bingo-core/interfaces';

@Component({
  selector: 'app-tablero-bolas',
  templateUrl: './tablero-bolas.component.html',
  styleUrls: ['./tablero-bolas.component.scss']
})

export class TableroBolasComponent {
  bingoService: BingoService = inject(BingoService);
  numerosBingo?: any
  

  constructor(){
    debugger 
    this.numerosBingo = {
      B: this.stringToArray(this.bingoService.configuracion.B),
      I: this.stringToArray(this.bingoService.configuracion.I),
      N: this.stringToArray(this.bingoService.configuracion.N),
      G: this.stringToArray(this.bingoService.configuracion.G),
      O: this.stringToArray(this.bingoService.configuracion.O),
     
    }
    this.bingoService.onLanzarNumeroSubject.subscribe((value: number) => {
      console.log('numero es ', value)
      this.numerosBingo = {
        B: this.stringToArray(this.bingoService.configuracion.B),
        I: this.stringToArray(this.bingoService.configuracion.I),
        N: this.stringToArray(this.bingoService.configuracion.N),
        G: this.stringToArray(this.bingoService.configuracion.G),
        O: this.stringToArray(this.bingoService.configuracion.O),
       
      }
    })
  }
  stringToArray(rango: string): {
    numero: number,
    estado: STATE_NUMERO
  }[] {
    const partes = rango.split('-');
    const inicio = parseInt(partes[0]);
    const fin = parseInt(partes[1]);
    
    const numeros: any[] = [];
    for (let i = inicio; i <= fin; i++) {
      numeros.push({
        numero: i,
        estado: this.bingoService.historialNumeros.find(numeroh => numeroh=== i)!!? STATE_NUMERO.CHECK: STATE_NUMERO.UNCHECK
      });
    }
    
    return numeros;
  }
  
  getNumerosBingoNormal():number[]{
    const numeros: number[] = [];

  for (let i = 1; i <= 75; i++) {
    numeros.push(i);
  }

  return numeros; 
  }
}
