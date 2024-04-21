import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroBolasComponent } from './tablero-bolas.component';

describe('TableroBolasComponent', () => {
  let component: TableroBolasComponent;
  let fixture: ComponentFixture<TableroBolasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableroBolasComponent]
    });
    fixture = TestBed.createComponent(TableroBolasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
