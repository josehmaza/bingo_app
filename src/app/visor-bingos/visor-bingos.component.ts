import { Component, inject } from '@angular/core';
import { HojaDeBingo } from '../bingo-core/hojaDeBingo';
import { BingoService } from '../bingo-core/bingoservice';

@Component({
  selector: 'app-visor-bingos',
  templateUrl: './visor-bingos.component.html',
  styleUrls: ['./visor-bingos.component.scss']
})
export class VisorBingosComponent {
  hojasDeBingo: HojaDeBingo[] =[]
  bingoService= inject(BingoService)
  constructor(){
    this.bingoService.onLanzarNumeroSubject.subscribe(numero => {
      console.log('re render')
    })
    //this.bingoService.crearHoja('1')
    //this.bingoService.crearHoja('2')
  }

}
