import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Producto {
    nombre: string;
    precio: number;
}

interface Pedido {
    _id: string;
    total: number;
    estado: string;
    productos: Producto[];
}

@Component({
    selector: 'app-gestion-pedidos',
    standalone: false,
    templateUrl: './gestion-pedidos.component.html',
    styleUrls: ['./gestion-pedidos.component.css']
})
export class GestionPedidosComponent implements OnInit {
    pedidos: Pedido[] = [];
    mensaje: string = '';
    chartData: any[] = [];

    // Configuración del gráfico
    view: [number, number] = [600, 400];
    colorScheme = 'cool'; 
    gradient = true;
    showXAxis = true;
    showYAxis = true;
    showLegend = true;
    showXAxisLabel = true;
    showYAxisLabel = true;
    xAxisLabel = 'Pedidos';
    yAxisLabel = 'Total ($)';

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        this.obtenerPedidos();
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

    obtenerPedidos(): void {
        this.http.get<Pedido[]>('http://localhost:5000/api/pedidos').subscribe(
            (data) => {
                console.log("Pedidos recibidos:", data);
                this.pedidos = data.map(pedido => ({
                    _id: pedido._id, 
                    total: pedido.total,
                    estado: pedido.estado,
                    productos: pedido.productos ? pedido.productos.map(prod => ({
                        nombre: prod.nombre || 'Producto sin nombre',
                        precio: prod.precio || 0
                    })) : []
                }));

                // Filtrar pedidos aceptados y convertirlos en datos para la gráfica
                this.chartData = this.pedidos
                    .filter(pedido => pedido.estado === 'Aceptado')
                    .flatMap(pedido => pedido.productos.map(producto => ({
                        name: producto.nombre,
                        value: pedido.total
                    })));

                console.log(" Datos para la gráfica:", this.chartData);
            },
            (error) => {
                console.error('❌ Error al obtener pedidos', error);
            }
        );
    }

    actualizarEstado(pedidoId: string, nuevoEstado: string): void {
        if (!pedidoId) {
            console.error("⚠️ Error: pedidoId es undefined.");
            return;
        }

        console.log(`🔄 Actualizando estado del pedido ${pedidoId} a ${nuevoEstado}`);

        this.http.patch(`http://localhost:5000/api/pedidos/${pedidoId}`, { estado: nuevoEstado }).subscribe(
            () => {
                this.pedidos = this.pedidos.map((pedido) =>
                    pedido._id === pedidoId ? { ...pedido, estado: nuevoEstado } : pedido
                );
                this.mensaje = `✅ Pedido ${pedidoId} actualizado a ${nuevoEstado}.`;
            },
            (error) => {
                console.error('❌ Error al actualizar el estado del pedido', error);
            }
        );
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
