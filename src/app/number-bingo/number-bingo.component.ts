import { Component } from '@angular/core';

enum ESTADO_BOLA{
  CHECK='CHECK',
  UNCHECK = 'UNCHECK'
}
@Component({
  selector: 'app-number-bingo',
  templateUrl: './number-bingo.component.html',
  styleUrls: ['./number-bingo.component.scss']
})

export class NumberBingoComponent {
  numero?: string
  estado?: ESTADO_BOLA
  
}
