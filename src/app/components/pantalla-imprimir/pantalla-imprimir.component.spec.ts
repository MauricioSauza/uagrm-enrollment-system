import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaImprimirComponent } from './pantalla-imprimir.component';

describe('PantallaImprimirComponent', () => {
  let component: PantallaImprimirComponent;
  let fixture: ComponentFixture<PantallaImprimirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaImprimirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaImprimirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
