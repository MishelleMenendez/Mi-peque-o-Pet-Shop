import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { AdminComponent } from './components/admin/admin.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { GestionProductosComponent } from './components/gestion-productos/gestion-productos.component';
import { GestionPedidosComponent } from './components/gestion-pedidos/gestion-pedidos.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'gestion_productos', component: GestionProductosComponent },
  { path: 'gestion_pedidos', component: GestionPedidosComponent },
  { path: 'productos', component: ProductosComponent },
  { path: '**', redirectTo: 'home' }  // Redirige a Home si la ruta no existe
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
