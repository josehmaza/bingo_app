import { Injectable, inject } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable()
export class MessageService {
  modalService= inject(NgbModal)
  bsModalRef!: NgbModalRef 
  constructor(
  ) { }

  confirm(title: string, message: string, options: string[]): Observable<string> {
    const initialState = {
      title: title,
      message: message,
      options: options,
      answer: "",
    };
    this.bsModalRef = this.modalService.open(ConfirmDialogComponent);
    this.bsModalRef.componentInstance.title = title;
    this.bsModalRef.componentInstance.message = message;
    this.bsModalRef.componentInstance.options = options;

    return new Observable<string>(subscriber => {
      const subscription = this.bsModalRef.componentInstance.passEntry.subscribe((result:any) => {
        // Handle result here (e.g., button clicked)
        subscriber.next(  result); // Emit the selected option (or null if closed without selection)
        subscriber.complete();
      });
      return () => subscription.unsubscribe();
    });
    
   // return new Observable<string>(this.getConfirmSubscriber());
  }

  private getConfirmSubscriber() {
    return (observer:any) => {
      const subscription = this.bsModalRef.componentInstance.passEntry.subscribe((reason: string) => {
        observer.next(this.bsModalRef.componentInstance.answer);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    }
  }

}
