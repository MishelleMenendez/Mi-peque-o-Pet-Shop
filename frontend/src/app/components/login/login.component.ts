import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {} // Inyectar HttpClient y Router

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

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    const userCredentials = { email: this.email, password: this.password };

    this.http.post('http://localhost:5000/api/usuarios/login', userCredentials, { withCredentials: true })
      .subscribe(
        (response: any) => {
          // Guardar ID y rol en localStorage
          localStorage.setItem('usuarioId', response.id);
          localStorage.setItem('usuarioRole', response.role);

          if (response.role === 'admin') {
            this.router.navigate(['/admin']); // Redirige al perfil de admin
          } else {
            this.router.navigate(['/cliente']); // Redirige al perfil de cliente
          }
        },
        (error) => {
          this.errorMessage = error.error.message || 'Error al iniciar sesión';
        }
      );
  }
}
