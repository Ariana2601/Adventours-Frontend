import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from '@angular/material/button';
import {UsuarioService} from '../../services/usuario.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Usuario} from '../../model/usuario';
import {Rol} from '../../model/rol';


@Component({
  selector: 'app-creacioncuenta',
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
    MatInputModule, MatButton, //add
  ],
  templateUrl: './creacioncuenta.component.html',
  styleUrl: './creacioncuenta.component.css'
})
export class CreacioncuentaComponent{
  usuarioForm: FormGroup;
  fb = inject(FormBuilder);
  usuarioService: UsuarioService = inject(UsuarioService);
  router: Router = inject(Router);
  //edicion
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute)
  id: number = 0
  rol: Rol = new Rol();

  constructor() {
    console.log("Constructor CreacioncuentaComponent")
    this.usuarioForm = this.fb.group({
      idUsuario: [''],
      nombreCompleto: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      rol:[''],
    })
  }
  //edicion
  ngOnInit(): void {
  }

  //Registro de un usuario
  onSubmit() {
  if (this.usuarioForm.valid) {
    const usuario: Usuario = new Usuario();
    usuario.idUsuario = this.id;
    usuario.nombreCompleto = this.usuarioForm.value.nombreCompleto;
    usuario.nombreUsuario = this.usuarioForm.value.nombreUsuario;
    usuario.correoElectronico = this.usuarioForm.value.correoElectronico;
    usuario.contrasena = this.usuarioForm.value.contrasena;
    usuario.rol = this.rol;
    usuario.rol.id = this.usuarioForm.value.rol.id;

    if (!this.edicion) {
           console.log("Datos aceptado:", usuario);
           this.usuarioService.insert(usuario).subscribe((data: Object): void => {
               this.usuarioService.list().subscribe(data => {
                 this.usuarioService.setList(data);//enviando la lista al suscriptor
               })
             });
    } else {
      //update
      console.log("Datos aceptado:", usuario);
      this.usuarioService.update(usuario).subscribe((data: Object): void => {
        this.usuarioService.list().subscribe(data => {
          this.usuarioService.setList(data);//enviando la lista al suscriptor
        })
      });
    }
    this.router.navigate(['login']);
  } else {
    console.log("Formulario no valido");
    }
  }
}
