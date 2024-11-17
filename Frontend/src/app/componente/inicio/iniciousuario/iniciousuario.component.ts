import {Component, HostListener, Injectable, OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatosService } from '../../../services/datos.service';
import { PreferenciasService } from '../../../services/preferencias.service';
import { DestinoService } from '../../../services/destino.service';
import { HUPreferenciasPersonales } from '../../../model/h-upreferencias-personales';
import { Destino } from '../../../model/destino';
import { PreferenciaRequest } from '../../../model/preferencia-request';
import {MatCheckbox} from '@angular/material/checkbox';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ContactoService} from '../../../services/contacto.service';
import {Hucontacto} from '../../../model/hucontacto';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-iniciousuario',
  standalone: true,
  imports: [RouterLink, MatCheckbox, NgIf, NgForOf, FormsModule, MatCardContent, MatCard],
  templateUrl: './iniciousuario.component.html',
  styleUrls: ['./iniciousuario.component.css']
})
export class IniciousuarioComponent implements OnInit {
  NombrePortada: string = '';
  IDusuario: number = 0;
  destinos: Destino[] = [];
  preferencias: HUPreferenciasPersonales | null = null;
  selectedClima: string = '';
  selectedPresupuesto: string = '';
  selectedActividades: string = '';
  selectedRitmoviaje: string = '';
  selectedTipoviaje: string = '';
  mensaje: string = ''; // Mensaje escrito por el usuario
  tipoMensaje: string = ''; // Tipo de mensaje seleccionado por el usuario

  constructor(
    private datosService: DatosService,
    private preferenciasService: PreferenciasService,
    private destinoService: DestinoService,
    private contactoService: ContactoService,
    private router: Router
  ) {
    this.NombrePortada = datosService.nombre;
    this.IDusuario = datosService.idvalor;
  }
  ngOnInit(): void {
    this.cargarPreferencias();
  }
  cargarPreferencias(): void {
    const usuarioId = this.IDusuario; // ID del usuario
    this.preferenciasService.list(usuarioId).subscribe(
      (data: HUPreferenciasPersonales) => {
        this.preferencias = data;
        this.getDestinos(); // Llamamos a obtener los destinos tras cargar las preferencias
      },
      error => {
        console.error('Error al cargar preferencias:', error);
      }
    );
  }

  getDestinos(): void {
    if (this.preferencias) {
      this.destinoService.getDestinos(this.preferencias).subscribe(
        (data: Destino[]) => {
          this.destinos = data.slice(0, 3); // Limitar a 3 destinos
        },
        error => {
          console.error('Error al obtener destinos:', error);
        }
      );
    }
  }

  verDetalles(id: number): void {
    console.log('Ver detalles del destino con ID:', id);
    // Aquí puedes redirigir a otra ruta o abrir un modal
  }

  // Preferencias
  setClima(clima: string): void {
    this.selectedClima = clima;
  }

  setPresupuesto(presupuesto: string): void {
    this.selectedPresupuesto = presupuesto;
  }

  setActividades(actividades: string): void {
    this.selectedActividades = actividades;
  }

  setRitmoviaje(ritmoviaje: string): void {
    this.selectedRitmoviaje = ritmoviaje;
  }

  setTipoviaje(tipoviaje: string): void {
    this.selectedTipoviaje = tipoviaje;
  }
  //Se registran las preferencias que el usuario eligio
  onRegistroPreferencia(): void {
    const preferencia: PreferenciaRequest = new PreferenciaRequest();
    preferencia.usuarioId = this.IDusuario;
    preferencia.preferencias = {
      clima: this.selectedClima,
      presupuesto: this.selectedPresupuesto,
      actividades: this.selectedActividades,
      ritmoViaje: this.selectedRitmoviaje,
      tipoViaje: this.selectedTipoviaje
    };

    this.preferenciasService.insert(preferencia).subscribe({
      next: (data: Object): void => {
        console.log(data);
        alert("Preferencia registrada!");
      }
    });
  }

  // Botón para volver al inicio
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const backToTopButton = document.getElementById('backToTop');
    if (window.scrollY > 300) {
      backToTopButton?.classList.add('visible');
    } else {
      backToTopButton?.classList.remove('visible');
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onPopulares() {
    this.router.navigate(['populares']);
  }

  onRecomendaciones() {
    this.router.navigate(['recomendaciones']);
  }

  
  enviarMensajeCorreo(): void {

    const nuevoContacto: Hucontacto = {
      idContacto: 0,
      idUsuario: this.IDusuario,
      mensaje: this.mensaje,
      tipoMensaje: this.tipoMensaje,
      fechaEnvio: new Date()
    };
    alert(`Usuario encontrado! ${nuevoContacto.idUsuario}`);
    this.contactoService.insert(nuevoContacto).subscribe(
      response => {
        alert('Correo enviado con éxito');
        this.mensaje = ''; // Limpiar mensaje
        this.tipoMensaje = ''; // Limpiar tipo de mensaje
      },
      error => {
        console.error('Error al enviar el mensaje:', error);
        alert('Hubo un error al enviar el mensaje. Inténtalo nuevamente.');
      }
    );
  }
  setTipoMensaje(tipo: string): void {
    this.tipoMensaje = tipo;
  }
}
