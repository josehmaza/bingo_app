import { Injectable, inject } from '@angular/core';
import { BINGO_ESTADO, LETTER_BINGO, TIPO_JUEGO, TYPE_BINGO } from './enums';
import { BingoJson, ConfBINGO, HojaJson, JSONDATA } from './interfaces';
import { HojaDeBingo } from './hojaDeBingo';
import { JUGADA } from './tipoJuego';
import { Bingo } from './bingo';
import { BingoError } from './bingoException';
import { BehaviorSubject, Subject } from 'rxjs';
import { NumeroBingo } from './numeroBingo';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Probabilidad } from './models/probabilidad';
import { BingoUtil } from './bingoUtil';

@Injectable({
  providedIn: 'root',
})
export class BingoService {
  hojas: HojaDeBingo[] = [];
  historialNumeros: {numero: number
    letter: LETTER_BINGO
  }[] = [];
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
  saveInDb: boolean = false
  private dbService = inject(NgxIndexedDBService)
  constructor() {
    console.log('He ejecutado el constructor')
  }
  
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
  eliminarJugada(jugada: TIPO_JUEGO) {
    this._jugadasARealizar = this._jugadasARealizar.filter(jugadaR => jugada !== jugadaR );
    this.hojas.forEach((hoja: HojaDeBingo) => {
      hoja.tablasDeBingo.forEach((tabla: Bingo) => {
        this.verificarJugadaBingo(hoja, tabla)
        
      });
    });
  }
  empezarJuego(){
    if(this.hojas.length == 0){
      throw new BingoError('No hay hojas creadas')
    }
    let existe1Tabla: boolean =  this.hojas.filter((hoja: HojaDeBingo) => {
      return hoja.tablasDeBingo.length > 0
    }).length>0
    //DEbe haber al menos 1 tabla
    if(!existe1Tabla){
      throw new BingoError('Para empezar el juego debe haber al menos 1 tabla de bingo')
    }
    //DEbe haber al menos una jugada
    if(this.jugadasARealizar.length<=0){
      throw new BingoError('Para empezar el juego debe haber al menos 1 jugada')

    }
    this.cambiarEstadoBingo(BINGO_ESTADO.INICIADO)
  }
  /**
   * 
   * @param estado 
   */
  cambiarEstadoBingo(estado: BINGO_ESTADO){
    //if(estado == BINGO_ESTADO.INICIADO){
      //Para cambiar a estado iniciado debe haber al menos 1 hoja , y al menos una tabla
      //Tambien debe haber jugadas
      //debugger
      
      this.estado = estado
    //}
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

    let numeroLetra: {numero: number, letter: LETTER_BINGO} = this.obtenerLetter(numero)
    this.historialNumeros.push(numeroLetra);
    
    this.onLanzarNumeroSubject.next(numero);

    ///*
    //Verificar en todas las tablas que se chech el numero
    this.hojas.forEach((hoja: HojaDeBingo) => {
      hoja.tablasDeBingo.forEach((tabla: Bingo) => {
        tabla.checkNumber(numero);
        this.verificarJugadaBingo(hoja, tabla)
        debugger;
        
      });
    });
  }

  eliminarNumero(numero: number) {
    this.historialNumeros = this.historialNumeros.filter(numerox => {
      return numerox.numero !== numero
    });
    //Verificar en todas las tablas que se chech el numero
    this.hojas.forEach((hoja: HojaDeBingo) => {
      hoja.tablasDeBingo.forEach((tabla: Bingo) => {
        tabla.unCheckNumber(numero);
      });
    });
  }

  cleanAll(){
    this.hojas = []
    this.updateDB()
  }
  obtenerLetter(numero: number):{numero: number, letter: LETTER_BINGO} {
    if (BingoUtil.isInRange(+numero,
        +this.configuracion.B.split('-')[0],
        +this.configuracion.B.split('-')[1])) {
      return {
        numero,
        letter: LETTER_BINGO.B
      }
      
    }
    if (BingoUtil.isInRange(+numero,
      +this.configuracion.I.split('-')[0],
      +this.configuracion.I.split('-')[1])) {
    return {
      numero,
      letter: LETTER_BINGO.I
    }
    
    }
    if (BingoUtil.isInRange(+numero,
      +this.configuracion.N.split('-')[0],
      +this.configuracion.N.split('-')[1])) {
    return {
      numero,
      letter: LETTER_BINGO.N
    }
    
    }
    if (BingoUtil.isInRange(+numero,
      +this.configuracion.G.split('-')[0],
      +this.configuracion.G.split('-')[1])) {
    return {
      numero,
      letter: LETTER_BINGO.G
    }
    
    }
    if (BingoUtil.isInRange(+numero,
      +this.configuracion.O.split('-')[0],
      +this.configuracion.O.split('-')[1])) {
    return {
      numero,
      letter: LETTER_BINGO.O
    }
    
    }
    throw new BingoError('El numero lanzado no pertenece a ninguna letra')
    
    
  }
  verificarJugadaBingo(hoja: HojaDeBingo, tabla: Bingo){
    tabla.bingoJugadas =[]
    tabla.probalidades=[]
    ///Por cada jugada verificar
    let isBINGO: boolean = false;
    debugger
    if (tabla.typeBingo == TYPE_BINGO.TABLON) {
      this._jugadasARealizar.forEach((jugada: TIPO_JUEGO) => {
        ///
        if (jugada == TIPO_JUEGO.LLENA) {
          isBINGO = JUGADA.verificarTodoLleno(tabla);
        } else {
          /**
           * Cuando quiero verificar las jugadas de NUMERO, SIGNO, MINI, no aplica en tablones
           */
          switch (jugada) {
            case TIPO_JUEGO.TABLAS_NUMERO:
            case TIPO_JUEGO.TABLAS_SIGNO:
            case TIPO_JUEGO.TABLAS_MINI:
              isBINGO= false;
              break
            default:
              isBINGO = JUGADA.verificarJUEGO(tabla, jugada);

          }
        }
        /*if (isBINGO) {
          tabla.agregarBingo(jugada);
        }*/
      });
    }
    //debugger
    if (tabla.typeBingo == TYPE_BINGO.NUMERO) {
      isBINGO = JUGADA.verificarTodoLleno(tabla);
    }
    if (tabla.typeBingo == TYPE_BINGO.SIGNO) {
      isBINGO = JUGADA.verificarTodoLleno(tabla);
    }
    if (tabla.typeBingo == TYPE_BINGO.MINI) {
      isBINGO = JUGADA.verificarTodoLleno(tabla);
    }
    
    //ORDENAR LAS PROBABILIDADES
    debugger
    tabla.probalidades.sort(this.compararProbabilidad)
    debugger
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
  }
  private compararProbabilidad(a: Probabilidad, b: Probabilidad) {
      if (a.numerosRestantes < b.numerosRestantes) {
        return -1;
      }
      if (a.numerosRestantes > b.numerosRestantes) {
        return 1;
      }
      return 0;
  }
  /**
   * Cuando me doy cuenta que una numero ha sido marcado pero aun no ha salido
   */
 /* eliminarNumero(numero: number) {
    this.historialNumeros.push(-numero);
    //Verificar en todas las tablas que se chech el numero
    this.hojas.forEach((hoja: HojaDeBingo) => {
      hoja.tablasDeBingo.forEach((tabla: Bingo) => {
        tabla.unCheckNumber(numero);
      });
    });
  }*/
  /**
   * Cuando ya ha sido completada alguna jugada y ya no debe jugarse esta tabla
   */
  eliminarTablax(nombreHoja: string, codigoTabla: string) {
    let hoja: HojaDeBingo | undefined = this.hojas.find((hoja: HojaDeBingo) => {
      return hoja.nombre == nombreHoja;
    });
    if (!!hoja) {
      hoja.tablasDeBingo = hoja.tablasDeBingo.filter((tabla: Bingo) => {
        return tabla.codigo != codigoTabla;
      });
    }
  }
  eliminarTabla(codigoTabla: string) {
    this.hojas.forEach((hoja: HojaDeBingo) => {
      hoja.tablasDeBingo = hoja.tablasDeBingo.filter((tabla: Bingo) => {
        return tabla.codigo != codigoTabla;
      });
    });
    this.updateDB()

  }

  updateDB(){
    debugger
    if(this.saveInDb){
      this.dbService.clear('hojas').subscribe((successDeleted) => {
        console.log('eliminado? ', successDeleted);
        debugger
        this.dbService.bulkAdd('hojas', this.hojas).subscribe(result => {
          console.log('hojas creadas: ', result);
        })
      });
    }
    
  }
  /**
   * FIN DEL JUEGO-
   */
  crearHoja(nombre: string) {
    console.log('CREANDO HOJA +', nombre)
    let hoja: HojaDeBingo = new HojaDeBingo(nombre);
    this.hojas.push(hoja);
    this.updateDB()

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
      let bingo: Bingo = this.generarTabla(codigoTabla, numeros, tipo)
      hojaBuscada.crearTabla(bingo)
      //SI esta jugando, validar todas las bolas
      debugger
      if(this.estado == BINGO_ESTADO.INICIADO){
        this.historialNumeros.forEach(numero => {
          bingo.checkNumber(numero.numero);
        })
       
        //this.verificarJugadaBingo(hojaBuscada, bingo)
      }
      this.updateDB()
      //hojaBuscada.crearTabla(codigoTabla, numeros, tipo, this.configuracion);
    }
  }
  /**
   * 
   * @param codigoTabla 
   * @param numeros 
   * @param tipo 
   */
  generarTabla(
    codigoTabla: string,
    numeros: string, //Toda la lista
    tipo: TYPE_BINGO
  ) {
    debugger
    let bingo: Bingo = new Bingo(tipo, codigoTabla);
    numeros.split(',').forEach((numero) => {
      bingo.addNumero(numero);
    });
    //this.tablasDeBingo.push(bingo);
    if(!!this.configuracion){
      bingo.configuracion = this.configuracion;
    }
    return bingo;
  }
  editarTabla(bingo: Bingo, newName: string){
    bingo.codigo = newName
    this.updateDB()

  }
  editarHoja(hoja:HojaDeBingo, newName: string){
    hoja.nombre = newName
    this.updateDB()

  }
  eliminarHoja(nombreHoja:string){
    this.hojas = this.hojas.filter((hoja:HojaDeBingo) => {
      return hoja.nombre !== nombreHoja
    })
    this.updateDB()
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
    this.saveInDb = false 
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
    this.saveInDb = true
    this.updateDB()
  }

  cargarHojasDB(jsondata: HojaDeBingo[]) {
    console.log('===??=?=?');
    debugger
    this.saveInDb = false
    jsondata.forEach((hoja: HojaDeBingo) => {
      this.crearHoja(hoja.nombre);
      hoja.tablasDeBingo.forEach((tabla: Bingo) => {
        this.crearTabla(
          hoja.nombre,
          tabla.codigo,
          tabla.numeros.map(numero => numero.numero).join(','),
          this.convertToTYPE_BINGOEnum(tabla.typeBingo)
        );
      });
    });
    this.saveInDb = true
  }

  convertToTYPE_BINGOEnum(str: string): TYPE_BINGO {
    const colorValue = TYPE_BINGO[str as keyof typeof TYPE_BINGO];
    return colorValue;
  }
  /**
   * 
   * @param bingo Valida que los numeros de la tabla este correctos,
   * -No haya duplicados
   * -Este completos los 25 numeros
   * -No Este el numero central
   * -Todos los numeros esten en les corresponda ,(4 no este en la N)
   * - Que no haya mas numero ejm 7 numero en la B
   */
  validateTable(bingo: Bingo){
    if(bingo.typeBingo == TYPE_BINGO.TABLON){
      //no haya duplicados 
      if(this.hasDuplicatesBynum(bingo.numeros)){
        throw new BingoError('Tiene numeros duplicados')
      }
      //Cada letra debe contener unicamente 5 numeros o menos
      let numerosB = bingo.numeros.filter((numero: NumeroBingo) => {
        return numero.letter === LETTER_BINGO.B
      })
      if(numerosB.length> 5){
        throw new BingoError(`B tiene exceso de numeros.(${numerosB.length})`)
      }

      let numerosI = bingo.numeros.filter((numero: NumeroBingo) => {
        return numero.letter === LETTER_BINGO.I
      })
      if(numerosI.length> 5){
        throw new BingoError(`I tiene exceso de numeros.(${numerosI.length})`)
      }

      let numerosN = bingo.numeros.filter((numero: NumeroBingo) => {
        return numero.letter === LETTER_BINGO.N
      })
      if(numerosN.length> 5){
        throw new BingoError(`N tiene exceso de numeros.(${numerosN.length})`)
      }

      let numerosG = bingo.numeros.filter((numero: NumeroBingo) => {
        return numero.letter === LETTER_BINGO.G
      })
      if(numerosG.length> 5){
        throw new BingoError(`G tiene exceso de numeros.(${numerosG.length})`)
      }

      let numerosO = bingo.numeros.filter((numero: NumeroBingo) => {
        return numero.letter === LETTER_BINGO.O
      })
      if(numerosO.length> 5){
        throw new BingoError(`O tiene exceso de numeros.(${numerosO.length})`)
      }
      //=========

      //Este completo los 25 numeros
      if(bingo.numeros.length < 25){
        throw new BingoError('Numeros incompletos para llenar la tabla')

      }
      if(bingo.numeros.length > 25){
        throw new BingoError(`Exceso de numeros(${bingo.numeros.length}) para la tabla`)

      }
      //No esta el numero central
      let numeroCentral = bingo.numeros.find((numero: NumeroBingo) => {
        return numero.numero === 0
      } )
      if(!numeroCentral){
        throw new BingoError('No tiene el numero central 0.')
      }
      //No debe tener mas de un numero central
      
      
    }
    
    if(bingo.typeBingo == TYPE_BINGO.NUMERO || bingo.typeBingo === TYPE_BINGO.SIGNO){
      //Validar q tenga el numero central
      let numeroCentral = bingo.numeros.find((numero: NumeroBingo) => {
        return numero.numero === 0
      } )
      if(!numeroCentral){
        throw new BingoError('No tiene el numero central 0.')
      }
      //Tiene numeos duplicados
      if(this.hasDuplicatesBynum(bingo.numeros.filter(numero => numero.numero !== -1))){
        throw new BingoError('Tiene numeros duplicados')
      }
      //Tiene mas de 25 numeros 
      if(bingo.numeros.length > 25){
        throw new BingoError('Tiene mas de 25 numeros')

      }
    }
  

  }
   hasDuplicatesBynum(objects: NumeroBingo[]): boolean {
    const uniqueIds = new Set();
  
    for (const obj of objects) {
      const id = obj.numero; // Suponiendo que "id" es la propiedad que representa el identificador único
  
      if (uniqueIds.has(id)) {
        return true; // Se encontró un ID duplicado
      }
  
      uniqueIds.add(id); // Agregar el ID al conjunto de IDs únicos
    }
  
    return false; // No se encontraron IDs duplicados
  }

  verificarProbabilidades(){
    this.hojas.forEach((hoja:HojaDeBingo) => {
      hoja.tablasDeBingo.forEach((bingo: Bingo) => {
        this.verificarPobabilidadPorTabla(bingo, this.jugadasARealizar)
      })
    })
  }
  verificarPobabilidadPorTabla(tabla: Bingo, jugada: TIPO_JUEGO[]){
    if(tabla.typeBingo === TYPE_BINGO.TABLON){

    }
  }
}
