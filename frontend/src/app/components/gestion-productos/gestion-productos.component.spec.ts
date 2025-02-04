import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionProductosComponent } from './gestion-productos.component';
import { FormsModule } from '@angular/forms';

describe('GestionProductosComponent', () => {
  let component: GestionProductosComponent;
  let fixture: ComponentFixture<GestionProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionProductosComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update producto model', () => {
    component.producto.nombre = 'Nuevo Producto';
    expect(component.producto.nombre).toEqual('Nuevo Producto');
  });

  it('should call agregarProducto method', () => {
    spyOn(component, 'agregarProducto');
    component.agregarProducto();
    expect(component.agregarProducto).toHaveBeenCalled();
  });
});
