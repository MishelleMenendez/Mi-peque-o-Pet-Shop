import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: false , 
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  nombre: string = '';
  email: string = '';
  password: string = '';
  role: string = 'cliente';
  mensaje: string = '';

  constructor(private http: HttpClient, private router: Router) {}

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

  onRegister() {
    if (!this.nombre || !this.email || !this.password) {
      this.mensaje = "Todos los campos son obligatorios.";
      return;
    }

    const nuevoUsuario = {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.http.post('http://localhost:5000/api/usuarios/register', nuevoUsuario).subscribe(
      (response: any) => {
        this.mensaje = response.message;
        this.nombre = '';
        this.email = '';
        this.password = '';
        this.role = 'cliente';
      },
      (error) => {
        this.mensaje = error.error.message || "Error al registrar usuario.";
      }
    );
  }
}
