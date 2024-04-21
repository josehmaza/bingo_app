import { Component, OnInit } from '@angular/core';
import { ServicioFamiliarService } from '../servicio-familiar.service';

@Component({
  selector: 'app-padre',
  templateUrl: './padre.component.html',
  styleUrls: ['./padre.component.scss']
})
export class PadreComponent implements OnInit{

  contador: number = 0
  mensajeRecibido: string = ''  
  nombre?: string
  dolar: number= 1000.5
  constructor(private _servicioFamiliarService: ServicioFamiliarService){

  }

  ngOnInit(){

    this._servicioFamiliarService.setHermanoGrande("Juan")
    this.nombre = this._servicioFamiliarService.getHermanoGrande()
  }
  
  saludar(){
    this._servicioFamiliarService.saludar(this._servicioFamiliarService.getHermanoPequenio() || '')
  }
  preguntar(){
    console.log(this._servicioFamiliarService.preguntarProHijo());
    
  }
}
