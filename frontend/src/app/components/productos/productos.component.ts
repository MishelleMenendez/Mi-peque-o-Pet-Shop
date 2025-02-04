import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: false , 
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
    productos: any[] = [];
  
    constructor(private http: HttpClient, private router: Router) {
      this.obtenerProductos();
    }

    ngOnInit() {
        this.detectarDispositivo();
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.detectarDispositivo();
    }

    detectarDispositivo() {
        if (window.innerWidth <= 768) {
            console.log("Modo móvil activado");
            document.body.classList.add("modo-movil");
            document.body.classList.remove("modo-escritorio");
        } else {
            console.log("Modo escritorio activado");
            document.body.classList.add("modo-escritorio");
            document.body.classList.remove("modo-movil");
        }
    }
  
    obtenerProductos() {
        this.http.get('http://localhost:5000/api/productos').subscribe(
          (data: any) => {
            console.log('Productos recibidos:', data); 
            this.productos = data;
          },
          (error) => {
            console.error('Error al obtener productos', error);
          }
        );
      }
  
    comprarProducto(producto: any) {
      this.router.navigate(['/pedidos'], { queryParams: { 
        id: producto._id, 
        nombre: producto.nombre, 
        descripcion: producto.descripcion, 
        precio: producto.precio 
      }});
    }

    cerrarSesion() {
        this.http.post('http://localhost:5000/api/usuarios/logout', {}).subscribe(
          () => {
            this.router.navigate(['/login']); // Redirigir al login después de cerrar sesión
          },
          (error) => {
            console.error("Error al cerrar sesión:", error);
          }
        );
      }
}
