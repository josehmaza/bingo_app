import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  title?: string;
  message?: string;
  options?: string[];
  answer: string = '';
  items: any[];
  activeModal = inject( NgbActiveModal)
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.items = Array(15).fill(0);
  }

  respond(answer: string) {
    debugger
    this.answer = answer;
    this.passEntry.emit(answer)
    this.activeModal.close('closex');
  }
}
