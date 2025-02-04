import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  standalone: false , 
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
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
}
