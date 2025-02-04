import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pedidos',
  standalone: false , 
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  producto: any = {};
  cantidad: number = 1;
  usuarioId: string = '';
  direccion: string = '';
  telefono: string = '';
  referencia: string = '';
  mensaje: string = '';
  mensajeClase: string = '';
  pedidos: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.usuarioId = localStorage.getItem('usuarioId') || '';

    if (!this.usuarioId) {
      alert('No hay sesión activa. Por favor, inicia sesión.');
      this.router.navigate(['/login']);
    }

    // Obtener los datos del producto desde la URL
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.producto = {
          id: params['id'],
          nombre: params['nombre'],
          descripcion: params['descripcion'],
          precio: params['precio']
        };
      } else {
        alert('No se seleccionó ningún producto.');
        this.router.navigate(['/productos']);
      }
    });
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

  realizarPedido() {
    if (!this.usuarioId || !this.producto.id || !this.cantidad || !this.direccion || !this.telefono) {
        alert("Faltan datos obligatorios.");
        console.error("Error: usuarioId, producto.id o datos de envío no definidos", {
            usuarioId: this.usuarioId,
            producto: this.producto,
            cantidad: this.cantidad,
            direccion: this.direccion,
            telefono: this.telefono
        });
        return;
    }

    const pedido = {
        usuarioId: this.usuarioId,
        productos: [this.producto.id],
        total: this.cantidad * this.producto.precio,
        estado: 'Pendiente',
        direccion: this.direccion,
        telefono: this.telefono,
        referencia: this.referencia
    };

    console.log("📩 Enviando pedido:", pedido);

    this.http.post('http://localhost:5000/api/pedidos', pedido).subscribe(
        (response: any) => {
            alert('Pedido realizado con éxito.');
            this.router.navigate(['/cliente']); 
        },
        (error) => {
            console.error('❌ Error al realizar el pedido:', error);
            alert('Error al realizar el pedido. Verifica la consola.');
        }
    );
  }

  cerrarSesion() {
    this.http.post('http://localhost:5000/api/usuarios/logout', {}).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error("Error al cerrar sesión:", error);
      }
    );
  }
}
