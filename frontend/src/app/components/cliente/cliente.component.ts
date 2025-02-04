import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: false, 
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  usuario: any = null;
  pedidos: any[] = [];
  mensaje: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.obtenerSesionUsuario();
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

  obtenerSesionUsuario() {
    this.http.get('http://localhost:5000/api/usuarios/session', { withCredentials: true })
      .subscribe(
        (response: any) => {
          this.usuario = response;
          this.obtenerPedidos();
        },
        (error) => {
          this.mensaje = "No hay sesión activa.";
        }
      );
  }

  obtenerPedidos() {
    this.http.get('http://localhost:5000/api/pedidos/mis-pedidos', { withCredentials: true }).subscribe(
      (response: any) => {
        console.log("Pedidos recibidos:", response);
        this.pedidos = response;
      },
      (error) => {
        console.error("❌ Error al obtener pedidos:", error);
        this.mensaje = "No se encontraron pedidos.";
      }
    );
  }

  cerrarSesion() {
    this.http.post('http://localhost:5000/api/usuarios/logout', {}).subscribe(
      () => {
        localStorage.removeItem('usuarioId'); // Borrar el ID del usuario almacenado
        this.router.navigate(['/login']); // Redirigir al login después de cerrar sesión
      },
      (error) => {
        console.error("Error al cerrar sesión:", error);
      }
    );
  }
}
