import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinoService } from '../../services/destino.service';
import { NgForOf, NgIf } from '@angular/common';
import { Destino } from '../../model/destino';
import {DatosService} from '../../services/datos.service';

interface DestinoExtendido extends Destino {
  imagenUrl: string;
}

@Component({
  selector: 'app-detallesdestino',
  standalone: true,
  templateUrl: './detallesdestino.component.html',
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./detallesdestino.component.css']
})
export class DetallesdestinoComponent implements OnInit {
  destino: DestinoExtendido | null = null; // Destino que se mostrará
  nombredestino: string = ''; // Nombre del destino a buscar

  constructor(
    private destinoService: DestinoService,
    private datosService: DatosService
  ) {
    this.nombredestino = datosService.nombredestino;
  }

  ngOnInit(): void {
    this.obtenerDestinoPorNombre(this.nombredestino);
  }


  obtenerDestinoPorNombre(nombre: string): void {
    this.destinoService.listPorNombre(nombre).subscribe({
      next: (data: Destino) => {
        if (data) {
          alert(`Destino encontrado: ${data.nombre}`);
          this.destino = {
            ...data,
            imagenUrl: this.obtenerImagenUrl(data.nombre) // Asigna la imagen basada en el nombre
          };
        } else {
          console.warn('No se encontró un destino con el nombre proporcionado.');
          this.destino = null; // Manejo en caso de que no haya datos
        }
      },
      error: (err) => {
        console.error('Error obteniendo el destino:', err);
        this.destino = null; // Limpia el destino en caso de error
      }
    });
  }

  obtenerImagenUrl(nombre: string): string {
    const imagenNombre = nombre.toLowerCase(); // Convertir el nombre a minúsculas
    const rutaImagen = `assets/${imagenNombre}.jpg`; // Construir la ruta usando el nombre del destino
    return rutaImagen;
  }
}
