import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfJugadasComponent } from './modal-conf-jugadas.component';

describe('ModalConfJugadasComponent', () => {
  let component: ModalConfJugadasComponent;
  let fixture: ComponentFixture<ModalConfJugadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfJugadasComponent]
    });
    fixture = TestBed.createComponent(ModalConfJugadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
