import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {HURecomendacionesDeViajeDto} from '../../model/hurecomendaciones-de-viaje-dto';
import {DestinoService} from '../../services/destino.service';
import {Router, RouterLink} from '@angular/router';
import {DatosService} from '../../services/datos.service';

interface DestinoExtendido extends HURecomendacionesDeViajeDto {
  imagenUrl: string;
}

@Component({
  selector: 'app-populares',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './populares.component.html',
  styleUrl: './populares.component.css'
})
export class PopularesComponent implements OnInit{
  destinosPopulares: DestinoExtendido[] = [];
  constructor(private destinoService: DestinoService, private datosService: DatosService) {} //agrego datosservice para guardar los datos
  router: Router = inject(Router);
  ngOnInit(): void {
    this.obtenerDestinosPopulares();
  }
  //Devuelve tres destinos ordenados por popularidad
  obtenerDestinosPopulares(): void {
    this.destinoService.destinospopulares().subscribe(
      (data: HURecomendacionesDeViajeDto[]) => {
        // Procesar solo los primeros 3 destinos y agregar la imagen
        this.destinosPopulares = data.slice(0, 3).map(destino => ({
          ...destino,
          imagenUrl: this.obtenerImagenUrl(destino.nombre)
        }));
      },
      (error) => {
        console.error('Error obteniendo destinos populares', error);
      }
    );
  }

  obtenerImagenUrl(nombre: string): string {
    const imagenNombre = nombre.toLowerCase(); // Convertir el nombre a minúsculas
    const rutaImagen = `assets/${imagenNombre}.jpg`; // Construir la ruta usando el nombre del destino
    return rutaImagen;
  }
  //Redirige a los detalles del destino elegido
  onDetalles(nombreDestino: string) {
    this.datosService.nombredestino = nombreDestino;
    alert(`Usuario encontrado! ${this.datosService.nombredestino}`);
    this.router.navigate(['detallesdestino']);
  }
}
