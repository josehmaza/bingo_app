import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-conf-jugadas',
  templateUrl: './modal-conf-jugadas.component.html',
  styleUrls: ['./modal-conf-jugadas.component.scss']
})
export class ModalConfJugadasComponent {
  @Input() public user:any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  activeModal = inject( NgbActiveModal)
  constructor(
   
  ) { }

  ngOnInit() {
    console.log(this.user);
  }

  passBack() {
    this.passEntry.emit(this.user);
    this.activeModal.close(this.user);
  }
}
