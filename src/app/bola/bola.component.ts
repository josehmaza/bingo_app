import { Component, Input, inject } from '@angular/core';
import { STATE_NUMERO } from '../bingo-core/enums';
import { BingoService } from '../bingo-core/bingoservice';
import { BingoError } from '../bingo-core/bingoException';
import { ToastService } from '../components/toast/toast.service';

@Component({
  selector: 'app-bola',
  templateUrl: './bola.component.html',
  styleUrls: ['./bola.component.scss']
})
export class BolaComponent {

  @Input() numero: number =0
  @Input() estado?: STATE_NUMERO = STATE_NUMERO.UNCHECK
  STATE_NUMERO_TYPE = STATE_NUMERO
  bingoService: BingoService = inject(BingoService);
  toastService= inject(ToastService)
  cambiarEstadoBola(){
    if(this.estado == STATE_NUMERO.CHECK){
      this.bingoService.eliminarNumero(this.numero)
      this.estado = STATE_NUMERO.UNCHECK
      return
    }
    if(this.estado == STATE_NUMERO.UNCHECK){
     
      console.log('Lanzando numero')
      try {
        this.bingoService.lanzarNumero(this.numero)
        this.estado = STATE_NUMERO.CHECK
      } catch (error) {
        if(error instanceof BingoError){
          this.toastService.showDanger(error.message)
        }
       //Si ha ocurrido algun error no cambiar el estado del check
      }
      

      return
    }
  }

}
