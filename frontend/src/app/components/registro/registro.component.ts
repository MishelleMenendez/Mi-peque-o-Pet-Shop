import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient) {} // Inyectar HttpClient

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

  onRegister() {
    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    const usuario = {
      nombre: this.username,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:5000/api/usuarios/register', usuario)
      .subscribe(
        (response: any) => {
          this.successMessage = response.message;
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = error.error.message || 'Error al registrar usuario';
          this.successMessage = '';
        }
      );
  }
}
