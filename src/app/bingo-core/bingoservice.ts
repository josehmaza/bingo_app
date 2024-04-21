import { Injectable } from '@angular/core';
import { BINGO_ESTADO, TIPO_JUEGO, TYPE_BINGO } from './enums';
import { BingoJson, ConfBINGO, HojaJson, JSONDATA } from './interfaces';
import { HojaDeBingo } from './hojaDeBingo';
import { JUGADA } from './tipoJuego';
import { Bingo } from './bingo';
import { BingoError } from './bingoException';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BingoService {
  hojas: HojaDeBingo[] = [];
  historialNumeros: number[] = [];
  private _jugadasARealizar: TIPO_JUEGO[] = [];
  private _estado: BINGO_ESTADO = BINGO_ESTADO.CREADO
  onLanzarNumeroSubject: BehaviorSubject<number>= new BehaviorSubject<number>(-1);  
  configuracion: ConfBINGO = {
      B: '1-15', // separada por guion
      I: '16-30',
      N: '31-45',
      G: '46-60',
      O: '61-75',
  }
  subject = new Subject();
  constructor() {}
  
  get jugadasARealizar(): TIPO_JUEGO[]{
    return this._jugadasARealizar
  }
  
  set jugadasARealizar(jugadas: TIPO_JUEGO[]){
    this._jugadasARealizar = jugadas
  }

  get estado(): BINGO_ESTADO{
    return this._estado
  }
  set estado(estado: BINGO_ESTADO){
    this._estado = estado
  }
  agregarJugada(jugada: TIPO_JUEGO) {
    this._jugadasARealizar.push(jugada);
  }
  /**
   * 
   * @param estado 
   */
  cambiarEstadoBingo(estado: BINGO_ESTADO){
    if(estado == BINGO_ESTADO.INICIADO){
      //Para cambiar a estado iniciado debe haber al menos 1 hoja , y al menos una tabla
      //Tambien debe haber jugadas
      debugger
      if(this.hojas.length == 0){
        throw new BingoError('No hay hojas creadas')
      }
      let existe1Tabla: boolean =  this.hojas.filter((hoja: HojaDeBingo) => {
        return hoja.tablasDeBingo.length > 0
      }).length>0
      if(!existe1Tabla){
        throw new BingoError('Para empezar el juego debe haber al menos 1 tabla de bingo')
      }
      this.estado = estado
    }
  }
  /**
   * EMPIEZA EL JUEGO
   */ //
  /**
   * Cuando se escoge una bola al azar
   */
  /**
   * 
   * @param numero 
   */
  lanzarNumero(numero: number) {
    //No hay como lanzar si no ha iniciado el juego
    debugger
    if(this._estado != BINGO_ESTADO.INICIADO){
      throw new BingoError('Debe iniciar el BINGO ');
    }

    this.historialNumeros.push(numero);
    this.onLanzarNumeroSubject.next(numero);

    ///*
    //Verificar en todas las tablas que se chech el numero
    this.hojas.forEach((hoja: HojaDeBingo) => {
      hoja.tablasDeBingo.forEach((tabla: Bingo) => {
        tabla.checkNumber(numero);

        debugger;
        ///Por cada jugada verificar
        let isBINGO: boolean = false;
        if (tabla.typeBingo == TYPE_BINGO.TABLON) {
          this._jugadasARealizar.forEach((jugada: TIPO_JUEGO) => {
            ///
            if (jugada == TIPO_JUEGO.LLENA) {
              isBINGO = JUGADA.verificarTodoLleno(tabla);
            } else {
              isBINGO = JUGADA.verificarJUEGO(tabla, jugada);
            }
            if (isBINGO) {
              tabla.agregarBingo(jugada);
            }
          });
        }
        if (tabla.typeBingo == TYPE_BINGO.NUMERO) {
          isBINGO = JUGADA.verificarTodoLleno(tabla);
        }
        if (tabla.typeBingo == TYPE_BINGO.SIGNO) {
          isBINGO = JUGADA.verificarTodoLleno(tabla);
        }
        if (tabla.typeBingo == TYPE_BINGO.MINI) {
          isBINGO = JUGADA.verificarTodoLleno(tabla);
        }

        //Si hay bINGO
        if (tabla.bingoJugadas.length > 0) {
          alert(
            'BINGO hoja:' +
              hoja.nombre +
              '  tabla:' +
              tabla.codigo +
              '  JUGADA: ' +
              tabla.bingoJugadas.toString()
          );
          console.log('========= BINGO START = ========');
          tabla.bingoJugadas.forEach((jugada: TIPO_JUEGO) => {
            console.log(jugada);
          });
          tabla.print();
          console.log('======== BINGO END =========');
        }
      });
    });
  }

  /**
   * Cuando me doy cuenta que una numero ha sido marcado pero aun no ha salido
   */
  eliminarNumero(numero: number) {
    this.historialNumeros.push(-numero);
    //Verificar en todas las tablas que se chech el numero
    this.hojas.forEach((hoja: HojaDeBingo) => {
      hoja.tablasDeBingo.forEach((tabla: Bingo) => {
        tabla.unCheckNumber(numero);
      });
    });
  }
  /**
   * Cuando ya ha sido completada alguna jugada y ya no debe jugarse esta tabla
   */
  eliminarTabla(nombreHoja: string, codigoTabla: string) {
    let hoja: HojaDeBingo | undefined = this.hojas.find((hoja: HojaDeBingo) => {
      return hoja.nombre == nombreHoja;
    });
    if (!!hoja) {
      hoja.tablasDeBingo = hoja.tablasDeBingo.filter((tabla: Bingo) => {
        return tabla.codigo != codigoTabla;
      });
    }
  }

  /**
   * FIN DEL JUEGO-
   */
  crearHoja(nombre: string) {
    let hoja: HojaDeBingo = new HojaDeBingo(nombre);
    this.hojas.push(hoja);
  }

  crearTabla(
    nombreHoja: string,
    codigoTabla: string,
    numeros: string, //Toda la lista
    tipo: TYPE_BINGO
  ) {
    let hojaBuscada: HojaDeBingo | undefined = this.hojas.find((hoja) => {
      //debugger;
      return hoja.nombre == nombreHoja;
    });
    if (!!hojaBuscada) {
      hojaBuscada.crearTabla(codigoTabla, numeros, tipo, this.configuracion);
    }
  }
  checkForma() {}
  printHojas() {
    console.log('imprimiendo hojass');
    this.hojas.forEach((hoja) => {
      hoja.print();
    });
  }
  /**
   * Debe abrir
   */
  guardarHojas() {
    console.log('GUARDAR HOJAS');
    let fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11 en JavaScript
    const dia = fechaActual.getDate();
    const hora = fechaActual.getHours();
    const minuto = fechaActual.getMinutes();

    // Formatear la fecha y hora en una cadena legible
    const nombreArchivo = `${año}-${mes}-${dia}_${hora}-${minuto}.json`;

    let json = this._generarBingoTXT();
    // Convertir el objeto a formato JSON

    // Crear un blob con el JSON
    const blob = new Blob([json], { type: 'application/json' });

    // Crear un enlace <a> para descargar el archivo
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = nombreArchivo;

    // Simular un clic en el enlace para iniciar la descarga
    enlace.click();
  }
  /**
   * generar el texto a guardar ene l archivo txt
   */
  private _generarBingoTXT(): string {
    let hojas: any[] = [];
    this.hojas.forEach((hoja: HojaDeBingo) => {
      let hojaJSON: any = {
        nombre: hoja.nombre,
        tablasDeBingo: hoja.tablasDeBingo.map((tabla: Bingo) => tabla.toJSON()),
      };
      hojas.push(hojaJSON);
    });

    return JSON.stringify({ hojas });
  }
  //Luego de haber obtenido el contenido del archivo de texto
  cargarHojas(jsondata: JSONDATA) {
    console.log('===??=?=?');
    debugger;
    jsondata.hojas.forEach((hoja: HojaJson) => {
      this.crearHoja(hoja.nombre);
      hoja.tablasDeBingo.forEach((tabla: BingoJson) => {
        this.crearTabla(
          hoja.nombre,
          tabla.codigo,
          tabla.numeros.join(','),
          this.convertToTYPE_BINGOEnum(tabla.typeBingo)
        );
      });
    });
  }
  convertToTYPE_BINGOEnum(str: string): TYPE_BINGO {
    const colorValue = TYPE_BINGO[str as keyof typeof TYPE_BINGO];
    return colorValue;
  }
}
