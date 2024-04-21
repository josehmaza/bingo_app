import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorBingosComponent } from './visor-bingos.component';

describe('VisorBingosComponent', () => {
  let component: VisorBingosComponent;
  let fixture: ComponentFixture<VisorBingosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisorBingosComponent]
    });
    fixture = TestBed.createComponent(VisorBingosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
