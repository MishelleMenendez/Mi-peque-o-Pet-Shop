import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosComponent } from './productos.component';

describe('ProductosComponent', () => {
  let component: ProductosComponent;
  let fixture: ComponentFixture<ProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have productos list', () => {
    expect(component.productos.length).toBeGreaterThan(0);
  });

  it('should call comprarProducto method', () => {
    spyOn(component, 'comprarProducto');
    const producto = { imagen: 'test.jpg', descripcion: 'Producto Test' };
    component.comprarProducto(producto);
    expect(component.comprarProducto).toHaveBeenCalled();
  });
});
