import { Component, Inject, OnInit, inject } from '@angular/core';
import { ServicioFamiliarService } from '../servicio-familiar.service';

@Component({
  selector: 'app-hermano',
  templateUrl: './hermano.component.html',
  styleUrls: ['./hermano.component.scss']
})
export class HermanoComponent  implements OnInit{
  nombre?: string
  private _servicioFamiliarService = inject(ServicioFamiliarService)
/*  constructor(private _servicioFamiliarService: ServicioFamiliarService){

  }*/

  
  ngOnInit(){

    this._servicioFamiliarService.setHermanoPequenio("Pedro")
    this.nombre = this._servicioFamiliarService.getHermanoPequenio()
  }

  saludar(){
    this._servicioFamiliarService.saludar(this._servicioFamiliarService.getHermanoGrande() || '')

  }
  preguntar(){
    console.log(this._servicioFamiliarService.preguntarProHijo());
  }
}
