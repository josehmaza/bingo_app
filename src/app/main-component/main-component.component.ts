import { Component, inject, numberAttribute } from '@angular/core';
import { BingoService } from '../bingo-core/bingoservice';
import { BINGO_ESTADO, TIPO_JUEGO, TYPE_BINGO } from '../bingo-core/enums';
import { BingoError } from '../bingo-core/bingoException';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfJugadasComponent } from '../modal-conf-jugadas/modal-conf-jugadas.component';
import { HojaDeBingo } from '../bingo-core/hojaDeBingo';
import { Bingo } from '../bingo-core/bingo';
import { MessageService } from '../services/message.service';
import { ModalCreateTablaBingoComponent } from '../modal-create-tabla-bingo/modal-create-tabla-bingo.component';
import { JUGADA } from '../bingo-core/tipoJuego';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ToastService } from '../components/toast/toast.service';
import { JSONDATA } from '../bingo-core/interfaces';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  //imports: [NgbNavModule],
  //standalone: true,
  styleUrls: ['./main-component.component.scss'],
  providers: [MessageService]
})
export class MainComponentComponent {
  bingoService = inject(BingoService)
   modalService= inject(NgbModal)
   messageService= inject(MessageService)
   toastService= inject(ToastService)

   private dbService = inject(NgxIndexedDBService)
   active = 2;
   BINGO_ESTADO_TYPO =BINGO_ESTADO 
   tipoJuegos: {
    id: string,
    value: TIPO_JUEGO,
    checked: boolean
   }[]=[]
  constructor(){
    console.log('Estoy en el constructor de maincomponent')
    debugger
    //Verificar que haya datos en base y cargarlos
    this.bingoService.saveInDb = false
    this.dbService.getAll('hojas').subscribe((hojas) => {
     console.log('EN total hay ', hojas.length)
     debugger 
     if(!!hojas && hojas.length> 0){
        let hojasBingo: HojaDeBingo[] = hojas.map(hoja => {
          let hojaBingo: HojaDeBingo = hoja as HojaDeBingo
          return hojaBingo;
        })
        this.bingoService.cargarHojasDB(hojasBingo)
      }
    })
    this.bingoService.saveInDb = true
    debugger
    /*this.bingoService.agregarJugada(TIPO_JUEGO.DIAGONAL)
    this.bingoService.crearHoja('1')
    this.bingoService.crearTabla('1','0335814','15,8,1,6,9,23,27,21,26,29,45,39,0,32,44,57,51,56,58,49,74,64,68,72,62', TYPE_BINGO.TABLON)
    this.bingoService.crearTabla('1','0335813','10,14,3,8,6,25,20,29,28,19,39,34,0,44,32,55,57,47,51,49,71,70,62,63,65', TYPE_BINGO.TABLON)
    this.bingoService.crearTabla('1','0335815','6,5,15,11,9,29,20,25,28,21,34,37,0,45,44,50,57,47,46,53,70,64,71,62,65', TYPE_BINGO.TABLON)
    
    this.bingoService.crearHoja('2')
    this.bingoService.crearTabla('2', '0335809', '9,6,14,5,2,25,26,17,21,16,43,39,0,45,40,50,60,46,56,51,65,74,70,71,73', TYPE_BINGO.TABLON)
    this.bingoService.crearTabla('2', '0335810', '8,11,10,6,13,20,28,24,16,27,32,35,0,44,45,55,57,59,50,51,71,61,68,75,70', TYPE_BINGO.TABLON)
    */
    //this.bingoService.saveInDb = true
    //this.bingoService.updateDB()

    
    
    this.setJugadas()

   
  }
  changeCheckbox(jugadaChk: {
    id: string,
    value: TIPO_JUEGO,
    checked: boolean
  }){
    jugadaChk.checked =  !jugadaChk.checked
    if(jugadaChk.checked){
      this.bingoService.agregarJugada(jugadaChk.value)

    }else{
      this.bingoService.eliminarJugada(jugadaChk.value)

    }
    this.setJugadas()
    console.log(jugadaChk)
  }
  setJugadas(){
    debugger
    this.tipoJuegos = Object.entries(TIPO_JUEGO).map(([key, value]) => ({id: key, value: value, checked: false}))
    this.bingoService.jugadasARealizar.forEach((jugada: TIPO_JUEGO) => {
      
    })
    this.tipoJuegos = this.tipoJuegos.map((jugadaA) => {
      jugadaA.checked = !!this.bingoService.jugadasARealizar.find((jugada: TIPO_JUEGO) => {
        return jugadaA.value === jugada 
      }) 
      return jugadaA;
    })
  }
  iniciar(){
    try{
      this.bingoService.empezarJuego()
    } catch (error) {
      if(error instanceof BingoError){
        this.toastService.showDanger(error.message);
      }
    }
  }
 
  crearHoja(){
    this.openModalCreateHoja()
  }
  editarHoja($event: HojaDeBingo){
    this.openModalEditHoja($event)
  }
  eliminarHoja($event: HojaDeBingo){
    this.messageService.confirm(
      "Eliminar hoja de BINGO",
      `Esta seguro de eliminar la hoja ${$event.nombre}?`,
      ["Si", "No"])
      .subscribe((answer) => {
        if(answer =='Si'){
      this.bingoService.eliminarHoja($event.nombre)
        }
        console.log('La respuesta es '+answer);
      });
  }

  editarTabla($event: Bingo){
    console.log('EDitando tabla')
    this.openModalEditTable($event)
    
  }
  crearTabla($event: HojaDeBingo){
    this.openModalCreateTable($event)
  }
  eliminarTabla($event: Bingo){
    console.log('Eliminando tabla')
  
    this.messageService.confirm(
      "Eliminar tabla",
      `Esta seguro de eliminar la tabla ${$event.codigo}?`,
      ["Si", "No"])
      .subscribe((answer) => {
        if(answer =='Si'){
      this.bingoService.eliminarTabla($event.codigo)
        }
        console.log('La respuesta es '+answer);
      });
  }
  reset(){
    this.bingoService.cleanAll()
  }
  openModalEditTable(bingo: Bingo) {
    const modalRef = this.modalService.open(ModalConfJugadasComponent);
    modalRef.componentInstance.title = "Editar tabla de Bingo";
    modalRef.componentInstance.textValue = bingo.codigo;
    modalRef.componentInstance.textLabel = "Codigo";

    modalRef.componentInstance.passEntry.subscribe((newName:any) => {
      this.bingoService.editarTabla(bingo, newName)
    })
  }
  openModalEditHoja(hoja: HojaDeBingo){
    const modalRef = this.modalService.open(ModalConfJugadasComponent);
    modalRef.componentInstance.title = "Editar Hoja de Bingos";
    modalRef.componentInstance.textValue = hoja.nombre;
    modalRef.componentInstance.textLabel = "Nombre de Hoja";

    modalRef.componentInstance.passEntry.subscribe((newName:any) => {
      this.bingoService.editarHoja(hoja, newName)
    })
  }
  openModalCreateHoja(){
    const modalRef = this.modalService.open(ModalConfJugadasComponent);
    modalRef.componentInstance.title = "Crear Hoja de Bingos";
    modalRef.componentInstance.textValue = '';
    modalRef.componentInstance.textLabel = "Nombre de Hoja";

    modalRef.componentInstance.passEntry.subscribe((newName:any) => {
      this.bingoService.crearHoja( newName)
    })
  }
  openModalCreateTable(hoja: HojaDeBingo){
    const modalRef = this.modalService.open(ModalCreateTablaBingoComponent);
    modalRef.componentInstance.passEntry.subscribe((data:{
      codigo: string,
      numeros: number[],
      typeBingo: TYPE_BINGO;
    }) => {
      console.log('=> ',data)
      debugger
      this.bingoService.crearTabla(hoja.nombre, data.codigo, data.numeros.join(','), data.typeBingo )
    })
  }

  exportarTablas(){
    this.bingoService.guardarHojas()
  }
  importarTablas(){
    const archivoInput: any = document.getElementById('archivoInput');
    const archivo = archivoInput.files[0];

    if (!archivo) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }

    const lector = new FileReader();

    lector.onload = (evento: any | null) => {
      const contenido = evento.target.result;
      const jsonData: JSONDATA = JSON.parse(contenido);
      console.log('Objeto cargado:', jsonData);
      this.bingoService.cargarHojas(jsonData);
      //this.bingoService.printHojas();
    };

    lector.readAsText(archivo);
  }
  navChange($event:any){
    console.log("????",$event)
    //Si estoy saliendo de tab BINGO
    if($event.activeId === 3){
      //this.bingoService.updateDB()
    }

  }
}
