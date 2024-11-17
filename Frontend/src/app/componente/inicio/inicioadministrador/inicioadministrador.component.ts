import {Component, HostListener, inject, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router, RouterLink} from "@angular/router";
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../../model/empresa';
import { DatosService } from '../../../services/datos.service';
import { DestinoService } from '../../../services/destino.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { PreferenciaRequest } from '../../../model/preferencia-request';
import { Destino } from '../../../model/destino';
import { Usuario } from '../../../model/usuario';
import {UsuarioService} from '../../../services/usuario.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {DialogoComponent} from '../../listas/dialogo/dialogo.component';
import {MatDialog} from '@angular/material/dialog';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {Rol} from '../../../model/rol';
import {RolService} from '../../../services/rol.service';
import {AsignarDestinoDto} from '../../../model/asignar-destino-dto';
import {Pruebo} from '../../../model/pruebo';

@Component({
  selector: 'app-inicioadministrador',
  standalone: true,
  imports: [
    MatCheckboxModule, // Asegura el uso de MatCheckboxModule aquí
    FormsModule,
    MatCard,
    ReactiveFormsModule,
    MatCardContent,
    MatFormField,
    MatInput,
    MatButton,
    RouterLink,
    MatLabel,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatHeaderCellDef,
    MatCardTitle,
    MatOption,
    MatSelect,
    NgForOf,
  ],
  templateUrl: './inicioadministrador.component.html',
  styleUrls: ['./inicioadministrador.component.css']
})
export class InicioadministradorComponent {
  NombrePortada: string = '';

  // Formulario de empresa
  empresaForm: FormGroup;
  id: number = 0;
  fbe = inject(FormBuilder);

  // Campos de destino
  destinoForm: FormGroup;
  usuario: Usuario = new Usuario();
  empresa: Empresa = new Empresa();
  fb = inject(FormBuilder);
  idUsuario:number =0;
  idEmpresa:number =0;
  // Campos de selección de destinos
  selectedClima: string = '';
  selectedPresupuesto: string = '';
  selectedActividades: string = '';
  selectedRitmoViaje: string = '';
  selectedTipoViaje: string = '';

  empresaService: EmpresaService = inject(EmpresaService);
  destinoService: DestinoService = inject(DestinoService);
  router: Router = inject(Router);

  //lista destinos
  displayedColumns: string[]=['idDestino', 'nombre', 'descripcion', 'clima', 'presupuesto','actividades', 'ritmoViaje','tipoViaje','popularidad','accion01', 'accion02'];
  dataSource: MatTableDataSource<Destino> = new MatTableDataSource<Destino>()
  dialog: MatDialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  //asginar destino a empresa
  asignarForm: FormGroup;
  fbasig = inject(FormBuilder);


  public iddestinoSeleccionado: number = 0;
  public idempresaSeleccionado: number = 0;
  destino2: Destino = new Destino();
  empresa2: Empresa = new Empresa();
  pruebopue: Pruebo = new Pruebo();

  lista: Destino [] = [];
  lista2: Empresa [] = [];

  constructor(private datosService: DatosService) {
    this.NombrePortada = datosService.nombre;
    this.idUsuario = datosService.idvalor;
    this.idEmpresa = 0;
    this.destinoForm = this.fb.group({
      idDestino: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      popularidad: ['', Validators.required],
      usuario:[''],
      empresa:[''],
    });
    this.empresaForm = this.fbe.group({
      idEmpresa: [''],
      nombreEmpresa: ['', Validators.required],
      contactoEmpresa: ['', Validators.required],
    });

    this.asignarForm = this.fbasig.group({
      destinopue: ['', Validators.required],
      empresapue: ['', Validators.required],
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.loadLista();
  }

  private loadLista(): void {
    this.destinoService.list().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (error) => console.log("Error en consulta", error),
    })
    this.destinoService.list().subscribe({
      next: (data) => this.lista = data,
      error: (err) => console.error("Error en consulta", err)
    })
    this.empresaService.list().subscribe({
      next: (data) => this.lista2 = data,
      error: (err) => console.error("Error en consulta", err)
    })
  }

  // Métodos de selección única para cada categoría de destino
  setClima(clima: string): void { this.selectedClima = clima; }
  setPresupuesto(presupuesto: string): void { this.selectedPresupuesto = presupuesto; }
  setActividades(actividades: string): void { this.selectedActividades = actividades; }
  setRitmoViaje(ritmoViaje: string): void { this.selectedRitmoViaje = ritmoViaje; }
  setTipoViaje(tipoViaje: string): void { this.selectedTipoViaje = tipoViaje; }

  // Método de registro de destino
  onRegistrarDestino(): void {
    if (this.destinoForm.valid) {
      const destino: Destino = new Destino();
      destino.idDestino = 0;
      destino.nombre = this.destinoForm.value.nombre;
      destino.popularidad = Number(this.destinoForm.value.popularidad);
      destino.descripcion = this.destinoForm.value.descripcion;
      destino.clima = this.selectedClima;
      destino.presupuesto = this.selectedPresupuesto;
      destino.actividades = this.selectedActividades;
      destino.ritmoViaje = this.selectedRitmoViaje;
      destino.tipoViaje = this.selectedTipoViaje;
      destino.usuario = this.usuario;
      destino.usuario.idUsuario = 2;
      destino.empresa = this.empresa;
      destino.empresa.idEmpresa = 1;
      alert(`Preferencia registrada! Tipo de viaje: ${destino.nombre}`);
      console.log("Registrando destino:", destino);
      this.destinoService.insert(destino).subscribe({
        next: () => {
          this.loadLista();
          alert("Destino registrado con éxito!");
          this.router.navigate(['/inicioadministrador']); // Redirige después de registrar
        },
        error: (error) => {
          console.error("Error al registrar el destino:", error);
          alert("Error al registrar el destino.");
        }
      });
    }
  }

  onSubmit() {
    if (this.empresaForm.valid) {
      const empresa: Empresa = new Empresa();
      empresa.idEmpresa = this.id;
      empresa.nombreEmpresa = this.empresaForm.value.nombreEmpresa;
      empresa.contactoEmpresa = this.empresaForm.value.contactoEmpresa;
      this.empresaService.insert(empresa).subscribe((data: Object): void => {
        this.empresaService.list().subscribe(data => {
          this.empresaService.setList(data);
        });
      });
      alert(`Empresa registrada!`);
      this.router.navigate(['inicioadministrador']);
    } else {
      console.log("Formulario no válido");
    }
  }

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
  //abre un pequeño box para confirmar si quieres o no eliminar un destino
  openDialog(id:number){
    const dialogRef = this.dialog.open(DialogoComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.delete(id);
      }else{
        console.log("Diálogo respondió no eliminar");
      }
    });
  }

  delete(id:number){
    this.destinoService.deleteDestino(id).subscribe({
      next:()=>{
        this.loadLista();
      },
      error:(err)=>console.error("Error de eliminacion", err)
    });
  }
  //asignar empresa a destino
  onSubmit4() {
    if (this.asignarForm.valid) {
      const pruebov2: Pruebo = new Pruebo();
      pruebov2.destinopue = this.destino2;
      pruebov2.destinopue.idDestino = this.asignarForm.value.destinopue.idDestino;
      pruebov2.empresapue = this.empresa2;
      pruebov2.empresapue.idEmpresa = this.asignarForm.value.empresapue.idEmpresa;

      const asignacion:AsignarDestinoDto = new AsignarDestinoDto();
      asignacion.idDestino = pruebov2.destinopue.idDestino;
      asignacion.idEmpresa = pruebov2.empresapue.idEmpresa;
      alert(`Usuario encontrado! ${asignacion.idEmpresa}`);
      this.destinoService.asignardestino(asignacion).subscribe((data: Object): void => {
        alert("Asigando con éxito!");
      });
    }

  }

}

