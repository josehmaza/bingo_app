import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioFamiliarService {
  hermanoGrande?: string ;
  hermanoPequenio?: string ;
  constructor() { }

  getHermanoGrande(): string{
    return this.hermanoGrande ||'';
  }
  setHermanoGrande(hermano: string){
    this.hermanoGrande = hermano
  }

  getHermanoPequenio(): string{
    return this.hermanoPequenio ||'';
  }
  setHermanoPequenio(hermano: string){
    this.hermanoPequenio = hermano
  }
  

  saludar(hermano: string){
    console.log(`Hola ${hermano}`);
  }
  preguntarProHijo(): string {
    return 'Como esta tu hijo?'
  }
}
