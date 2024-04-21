import { Component, inject, numberAttribute } from '@angular/core';
import { BingoService } from '../bingo-core/bingoservice';
import { BINGO_ESTADO, TIPO_JUEGO, TYPE_BINGO } from '../bingo-core/enums';
import { BingoError } from '../bingo-core/bingoException';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfJugadasComponent } from '../modal-conf-jugadas/modal-conf-jugadas.component';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  //imports: [NgbNavModule],
  //standalone: true,
  styleUrls: ['./main-component.component.scss']
})
export class MainComponentComponent {
  bingoService = inject(BingoService)
   modalService= inject(NgbModal)
   active = 3;
   BINGO_ESTADO_TYPO =BINGO_ESTADO 
  constructor(){
    this.bingoService.agregarJugada(TIPO_JUEGO.DIAGONAL)
    this.bingoService.crearHoja('1')
    this.bingoService.crearTabla('1','0335814','15,8,1,6,9,23,27,21,26,29,45,39,0,32,44,57,51,56,58,49,74,64,68,72,62', TYPE_BINGO.TABLON)
    this.bingoService.crearTabla('1','0335813','10,14,3,8,6,25,20,29,28,19,39,34,0,44,32,55,57,47,51,49,71,70,62,63,65', TYPE_BINGO.TABLON)
    this.bingoService.crearTabla('1','0335815','6,5,15,11,9,29,20,25,28,21,34,37,0,45,44,50,57,47,46,53,70,64,71,62,65', TYPE_BINGO.TABLON)
    
    this.bingoService.crearHoja('2')
    this.bingoService.crearTabla('2', '0335809', '9,6,14,5,2,25,26,17,21,16,43,39,0,45,40,50,60,46,56,51,65,74,70,71,73', TYPE_BINGO.TABLON)
    this.bingoService.crearTabla('2', '0335810', '8,11,10,6,13,20,28,24,16,27,32,35,0,44,45,55,57,59,50,51,71,61,68,75,70', TYPE_BINGO.TABLON)
 
   
  }
  iniciar(){
    try{
      this.bingoService.cambiarEstadoBingo(BINGO_ESTADO.INICIADO)
    } catch (error) {
        console.error(error)
    }
  }
  openModal() {
    const modalRef = this.modalService.open(ModalConfJugadasComponent);
    modalRef.componentInstance.user = 'holala';
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
    // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    //   console.log(receivedEntry);
    // })
  }
  crearHoja(){
    this.bingoService.crearHoja('14')
  }
  reset(){

  }
}
