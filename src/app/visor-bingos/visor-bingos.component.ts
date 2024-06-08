import { Component, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { HojaDeBingo } from '../bingo-core/hojaDeBingo';
import { BingoService } from '../bingo-core/bingoservice';
import { ContextMenuComponent, ContextMenuService } from '@perfectmemory/ngx-contextmenu';
import { ContextMenuContentComponent } from '@perfectmemory/ngx-contextmenu/lib/components/context-menu-content/context-menu-content.component';
import { Bingo } from '../bingo-core/bingo';
import { ToastService } from '../components/toast/toast.service';

@Component({
  selector: 'app-visor-bingos',
  templateUrl: './visor-bingos.component.html',
  styleUrls: ['./visor-bingos.component.scss']
})
export class VisorBingosComponent {
  hojasDeBingo: HojaDeBingo[] =[]
  bingoService= inject(BingoService)
  toastService= inject(ToastService)
  mivalor: string = 'mivalorx'
  @Output() onCrearHoja = new EventEmitter<void>();
  @Output() onEditarHoja = new EventEmitter<HojaDeBingo>();
  @Output() onEliminarHoja = new EventEmitter<HojaDeBingo>();
  @Output() onEditarTabla = new EventEmitter<Bingo>();
  @Output() onCrearTabla = new EventEmitter<HojaDeBingo>();
  @Output() onEliminarTabla = new EventEmitter<Bingo>();
  contextMenuService = inject(ContextMenuService)

  tablaSeleccionada?: Bingo
  constructor(){
    this.bingoService.onLanzarNumeroSubject.subscribe(numero => {
      console.log('re render')
    })
    //this.bingoService.crearHoja('1')
    //this.bingoService.crearHoja('2')
  }
  //@ViewChild('oneContextMenu', {static: true}) public oneContextMenu!: ContextMenuContentComponent<string>;


  crearHoja(){
    console.log()
    this.onCrearHoja.emit()
  }
  editarHoja(hoja: HojaDeBingo){
    this.onEditarHoja.emit(hoja)

  }
  eliminarHoja(hoja: HojaDeBingo){
    this.onEliminarHoja.emit(hoja)

  }
  editarTabla(value: Bingo){
    this.onEditarTabla.emit(value)

  }
  crearTabla(hoja: HojaDeBingo){
    this.onCrearTabla.emit(hoja)
  }
  
  eliminarTabla(value: Bingo){
    console.log('Eliminar tabla')
    this.onEliminarTabla.emit(value)

  }
  copiarTabla(value: Bingo){
    
  }
  showMessage(value:string){
    console.log('xxx'+value)
  }

  public execute(text: string, value: string) {
    console.log(text, value);
  }
  /**
   * 
   * @param $event Es necesario esto ya que hay un error en la api de menucontext y no permite usar el value en templates de items
   * 
   * @param item 
   */
  public onContextMenu($event: MouseEvent, item: any): void {
    this.tablaSeleccionada = item
    $event.preventDefault();
    $event.stopPropagation();
  }
  public onClipboardCopy(successful: boolean): void {
    console.log(successful);
    this.toastService.show('Tabla copiada 😀', { classname: 'bg-success text-light', delay: 3000 });

    //this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
  }
}
