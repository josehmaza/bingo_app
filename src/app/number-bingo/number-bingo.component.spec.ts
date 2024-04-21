import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberBingoComponent } from './number-bingo.component';

describe('NumberBingoComponent', () => {
  let component: NumberBingoComponent;
  let fixture: ComponentFixture<NumberBingoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberBingoComponent]
    });
    fixture = TestBed.createComponent(NumberBingoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
