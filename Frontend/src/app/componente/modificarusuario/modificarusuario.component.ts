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
import {UsuarioService} from '../../services/usuario.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Rol} from '../../model/rol';
import {Usuario} from '../../model/usuario';
import {MatSelect} from '@angular/material/select';
import {RolService} from '../../services/rol.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-modificarusuario',
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
    MatInputModule, MatButton, MatSelect, MatOption, NgForOf, //add
  ],
  templateUrl: './modificarusuario.component.html',
  styleUrl: './modificarusuario.component.css'
})
export class ModificarusuarioComponent {
  usuariomodForm: FormGroup;
  fb = inject(FormBuilder);
  usuarioService: UsuarioService = inject(UsuarioService);
  router: Router = inject(Router);
  //edicion
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute)
  id: number = 0
  rol: Rol = new Rol();

  public idTipoSeleccionado: number = 0;
  tiporolservice:RolService = inject(RolService);
  lista: Rol [] = [];

  constructor() {
    console.log("Constructor CreacioncuentaComponent")
    this.usuariomodForm = this.fb.group({
      idUsuario: [''],
      nombreCompleto: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      rol:['', Validators.required],
    })
  }
  //edicion
  ngOnInit(): void { //sólo una vez luego del constructor
    this.loadLista();
    this.route.params.subscribe((data: Params) => {
      console.log("ngOnInit de CreacioncuentaComponent")
      console.log(data);
      this.id = data['id']; //capturando el id del listado
      this.edicion = data['id'] != null;//true, false
      this.cargaForm();
    });
  }
  loadLista(): void {
    this.tiporolservice.list().subscribe({
      next: (data) => this.lista = data,
      error: (err) => console.error("Error en consulta", err)
    })
  }
  cargaForm() {
    if (this.edicion) {
      this.usuarioService.listId(this.id).subscribe((data: Usuario) => {
        console.log(data);
        this.usuariomodForm.patchValue({
          nombreCompleto: data.nombreCompleto,
          nombreUsuario: data.nombreUsuario,
          correoElectronico: data.correoElectronico,
          contrasena: data.contrasena,
          rol: data.rol
        });
      });
    } //del if
  } // de cargaForm

  onSubmit2() {
    if (this.usuariomodForm.valid) {
      const usuario: Usuario = new Usuario();
      usuario.idUsuario = this.id;
      usuario.nombreCompleto = this.usuariomodForm.value.nombreCompleto;
      usuario.nombreUsuario = this.usuariomodForm.value.nombreUsuario;
      usuario.correoElectronico = this.usuariomodForm.value.correoElectronico;
      usuario.contrasena = this.usuariomodForm.value.contrasena;
      usuario.rol = this.rol;
      usuario.rol.id = this.usuariomodForm.value.rol.id;
      //update
      console.log("Datos aceptado:", usuario);
      this.usuarioService.update(usuario).subscribe((data: Object): void => {
        this.usuarioService.list().subscribe(data => {
          this.usuarioService.setList(data);//enviando la lista al suscriptor
        })
      });
      this.router.navigate(['inicioadministrador']);
    } else {
      console.log("Formulario no valido");
    }
  }

  onExit() {
    this.router.navigate(['listas']);
  }
}
