import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Bingo } from '../bingo-core/bingo';
import { TYPE_BINGO } from '../bingo-core/enums';
import { BingoService } from '../bingo-core/bingoservice';
import { BingoError } from '../bingo-core/bingoException';

@Component({
  selector: 'app-modal-create-tabla-bingo',
  templateUrl: './modal-create-tabla-bingo.component.html',
  styleUrls: ['./modal-create-tabla-bingo.component.scss']
})
export class ModalCreateTablaBingoComponent {
  @Output() passEntry: EventEmitter<{
    codigo: string,
    numeros: string[],
    typeBingo?: TYPE_BINGO;

  }> = new EventEmitter();
  activeModal = inject( NgbActiveModal)
  bingoService = inject(BingoService)
  codigoTabla: string=''
  numerosBingo: string = ''
  typeBingos: { id: string; value: TYPE_BINGO; }[] =[]
  bingoGenerated: string = ''
  states = [
    {name: 'Arizona', abbrev: 'AZ'},
    {name: 'California', abbrev: 'CA'},
    {name: 'Colorado', abbrev: 'CO'},
    {name: 'New York', abbrev: 'NY'},
    {name: 'Pennsylvania', abbrev: 'PA'},
  ];
  state = {name: 'Pennsylvania', abbrev: 'PA'}
  typeBingoSelected: TYPE_BINGO  = TYPE_BINGO.TABLON
  messageBingoValid: string =''
  isBingoValid: boolean= true;
  constructor(
    
  ) {
    this.typeBingos = Object.entries(TYPE_BINGO).map(([key, value]) => ({id: key, value: value}))
    console.log(this.typeBingos)
   }

  ngOnInit() {
  }

  passBack() {
    //Validar que la tabla este bien
    debugger
    this.passEntry.emit({
      codigo: this.codigoTabla,
      numeros: this.numerosBingo.split(','),
      typeBingo: this.typeBingoSelected
    });
    this.activeModal.close();
  }
  onKeypress(event: KeyboardEvent) {
    console.log('numerosBingo',this.numerosBingo);
    let bingo: Bingo = this.bingoService.generarTabla(this.codigoTabla, this.numerosBingo, this.typeBingoSelected)
   console.log('=========' ,bingo)
   this.bingoGenerated = bingo.toString()
   try {
    this.bingoService.validateTable(bingo)
    this.messageBingoValid = 'Esta tabla de bingo es valida'
    this.isBingoValid = true

   } catch (error) {
    if (error instanceof BingoError) {
      this.isBingoValid = false
      this.messageBingoValid = 'Esta tabla de Bingo es invalida. '+error.message
      console.log("error => "+error.message)
    }
   }
    console.log(bingo.toString())
    //bingo.print()
  }
  public onValueChangetxtA(event: Event): void {
    console.log(event.target);
    const value = (event.target as any).value;
    this.bingoGenerated = value;
  }
}
