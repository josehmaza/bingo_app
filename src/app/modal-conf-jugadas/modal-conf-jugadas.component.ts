import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-conf-jugadas',
  templateUrl: './modal-conf-jugadas.component.html',
  styleUrls: ['./modal-conf-jugadas.component.scss']
})
export class ModalConfJugadasComponent {
  @Input() public title?:string;
  @Input() public textValue?:string;
  @Input() public textLabel?:string;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  activeModal = inject( NgbActiveModal)
  constructor(
   
  ) {
    
   }

  ngOnInit() {
  }

  passBack() {
    this.passEntry.emit(this.textValue);
    this.activeModal.close(this.title);
  }
}
