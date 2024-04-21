import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TABLABINGOComponent } from './tablabingo.component';

describe('TABLABINGOComponent', () => {
  let component: TABLABINGOComponent;
  let fixture: ComponentFixture<TABLABINGOComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TABLABINGOComponent]
    });
    fixture = TestBed.createComponent(TABLABINGOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
