import { Bingo } from './bingo';
import { TYPE_BINGO } from './enums';
import { ConfBINGO } from './interfaces';

export class HojaDeBingo {
  tablasDeBingo: Bingo[] = [];
  nombre: string = '';
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  /**
   * numeros separados por coma..
   * el numero central va como 0
   */
  crearTabla(bingo: Bingo){
    this.tablasDeBingo.push(bingo)
  }
  /*crearTablaDeprecated(codigoTabla: string, numeros: string, tipo: TYPE_BINGO, configuracion?: ConfBINGO): Bingo {
    let bingo: Bingo = new Bingo(tipo, codigoTabla);
    numeros.split(',').forEach((numero) => {
      bingo.addNumero(numero);
    });
    this.tablasDeBingo.push(bingo);
    if(!!configuracion){
      bingo.configuracion = configuracion;
    }
    return bingo;
  }*/
  print() {
    console.log('======== START HOJA =====');

    console.log('Nombre de hoja: ' + this.nombre);

    this.tablasDeBingo.forEach((tabla) => {
      tabla.print();
    });
    console.log('======== END HOJA  ======');
  }
}
