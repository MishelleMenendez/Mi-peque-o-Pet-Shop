import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false , 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor() {}

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

    verProductos() {
        console.log("Redirigiendo a productos...");
    }
}
