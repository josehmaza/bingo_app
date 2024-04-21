import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolaComponent } from './bola.component';

describe('BolaComponent', () => {
  let component: BolaComponent;
  let fixture: ComponentFixture<BolaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BolaComponent]
    });
    fixture = TestBed.createComponent(BolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
