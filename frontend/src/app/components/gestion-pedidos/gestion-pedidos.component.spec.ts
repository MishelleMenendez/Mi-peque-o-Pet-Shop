import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionPedidosComponent } from './gestion-pedidos.component';

describe('GestionPedidosComponent', () => {
  let component: GestionPedidosComponent;
  let fixture: ComponentFixture<GestionPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have pedidos list', () => {
    expect(component.pedidos.length).toBeGreaterThan(0);
  });
});
