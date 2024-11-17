import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {HURecomendacionesDeViajeDto} from '../../model/hurecomendaciones-de-viaje-dto';
import {DestinoService} from '../../services/destino.service';
import {DatosService} from '../../services/datos.service';
import {Router} from '@angular/router';
interface DestinoExtendido extends HURecomendacionesDeViajeDto {
  imagenUrl: string;
}
@Component({
  selector: 'app-recomendaciones',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './recomendaciones.component.html',
  styleUrl: './recomendaciones.component.css'
})
export class RecomendacionesComponent implements OnInit {
  destinosRecomendados: DestinoExtendido[] = [];
  iduser: number = 0;
  constructor(private destinoService: DestinoService, private datosService: DatosService) {
    this.iduser = datosService.idvalor;
  }
  router: Router = inject(Router);

  ngOnInit(): void {
    this.obtenerDestinosPopulares();
  }

  obtenerDestinosPopulares(): void {
    this.destinoService.destinosrecomendaciones(this.iduser).subscribe(
      (data: HURecomendacionesDeViajeDto[]) => {
        // Procesar solo los primeros 3 destinos y agregar la imagen
        this.destinosRecomendados = data.slice(0, 3).map(destino => ({
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

  redirigirADetalles(nombreDestino: string) {
    this.datosService.nombredestino = nombreDestino;
    alert(`Usuario encontrado! ${this.datosService.nombredestino}`);
    this.router.navigate(['detallesdestino']);
  }
}
