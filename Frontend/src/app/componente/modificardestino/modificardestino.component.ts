import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Usuario} from '../../model/usuario';
import {MatSelect} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {DestinoService} from '../../services/destino.service';
import {Empresa} from '../../model/empresa';
import {Destino} from '../../model/destino';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-modificardestino',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatCardContent, MatLabel, MatHint, //add
    MatDatepickerModule,//add
    MatNativeDateModule, //add
    MatInputModule, MatButton, MatSelect, MatOption, NgForOf, MatCheckbox, //add
  ],
  templateUrl: './modificardestino.component.html',
  styleUrl: './modificardestino.component.css'
})
export class ModificardestinoComponent {
  destinomodForm: FormGroup;
  fb = inject(FormBuilder);
  destinoService: DestinoService = inject(DestinoService);
  router: Router = inject(Router);
  //edicion
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute)
  id: number = 0
  //usuario: Usuario = new Usuario();
  //empresa: Empresa = new Empresa();


  // Campos de selección de destinos
  selectedClima: string = '';
  selectedPresupuesto: string = '';
  selectedActividades: string = '';
  selectedRitmoViaje: string = '';
  selectedTipoViaje: string = '';

  constructor() {
    console.log("Constructor CreacioncuentaComponent")
    this.destinomodForm = this.fb.group({
      idDestino: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      popularidad: ['', Validators.required],
      usuario: [''],
      empresa: [''],
    })
  }

  //edicion
  ngOnInit(): void { //sólo una vez luego del constructor
    this.loadLista();
    this.route.params.subscribe((data: Params) => {
      console.log("ngOnInit de ModificarComponent")
      console.log(data);
      this.id = data['id']; //capturando el id del listado
      this.edicion = data['id'] != null;//true, false
      this.cargaForm();
    });
  }
  loadLista(): void {
  }
  cargaForm() {
    if (this.edicion) {
      this.destinoService.listId(this.id).subscribe((data: Destino) => {
        console.log(data);
        this.destinomodForm.patchValue({
          nombre: data.nombre,
          descripcion: data.descripcion,
          popularidad: data.popularidad,
          clima : data.clima,
          presupuesto : data.presupuesto,
          actividades : data.actividades,
          ritmoViaje : data.ritmoViaje,
          tipoViaje: data.tipoViaje,
          usuario: data.usuario,
          empresa: data.empresa,
        });
      });
    } //del if
  } // de cargaForm

  // Métodos de selección única para cada categoría de destino
  setClima(clima: string): void { this.selectedClima = clima; }
  setPresupuesto(presupuesto: string): void { this.selectedPresupuesto = presupuesto; }
  setActividades(actividades: string): void { this.selectedActividades = actividades; }
  setRitmoViaje(ritmoViaje: string): void { this.selectedRitmoViaje = ritmoViaje; }
  setTipoViaje(tipoViaje: string): void { this.selectedTipoViaje = tipoViaje; }

  onSubmit() {
    if (this.destinomodForm.valid) {
      const destino2: Destino = new Destino();
      destino2.idDestino = this.id;
      destino2.nombre = this.destinomodForm.value.nombre;
      destino2.popularidad = Number(this.destinomodForm.value.popularidad);
      destino2.descripcion = this.destinomodForm.value.descripcion;
      destino2.clima = this.selectedClima;
      destino2.presupuesto = this.selectedPresupuesto;
      destino2.actividades = this.selectedActividades;
      destino2.ritmoViaje = this.selectedRitmoViaje;
      destino2.tipoViaje = this.selectedTipoViaje;

      //alert(`Preferencia registrada! Tipo de viaje: ${destino2.usuario.idUsuario}`);
      //alert(`Usuario encontrado! ${destino2.empresa.idEmpresa}`);
      //(`Usuario encontrado! ${this.empresa.idEmpresa}`);

      console.log("Registrando destino:", destino2);
      this.destinoService.updateDestino(destino2).subscribe((data: Object): void => {
        this.destinoService.list().subscribe(data => {
          this.destinoService.setList(data);
        });
      });
      alert(`Empresa registrada!`);
      this.router.navigate(['inicioadministrador']);
    } else {
      console.log("Formulario no valido");
    }
  }

  onExit() {
    this.router.navigate(['/inicioadministrador']); // Redirige después de registrar
  }
}
