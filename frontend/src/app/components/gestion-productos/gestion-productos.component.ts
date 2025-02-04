import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-productos',
  standalone: false , 
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {
    productos: any[] = [];
    producto = { nombre: '', descripcion: '', precio: 0, unidades: 0 };
    
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

    obtenerProductos() {
        this.http.get('http://localhost:5000/api/productos')
            .subscribe((data: any) => {
                this.productos = data;
            });
    }
    
    agregarProducto() {
        this.http.post('http://localhost:5000/api/productos', this.producto)
            .subscribe((response: any) => {
                alert(response.message);
                this.obtenerProductos(); // Recargar la lista de productos
                this.producto = { nombre: '', descripcion: '', precio: 0, unidades: 0 }; // Limpiar el formulario
            });
    }
}
