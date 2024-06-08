import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateTablaBingoComponent } from './modal-create-tabla-bingo.component';

describe('ModalCreateTablaBingoComponent', () => {
  let component: ModalCreateTablaBingoComponent;
  let fixture: ComponentFixture<ModalCreateTablaBingoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCreateTablaBingoComponent]
    });
    fixture = TestBed.createComponent(ModalCreateTablaBingoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
