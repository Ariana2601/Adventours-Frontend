import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {Usuario} from '../../model/usuario';
import {UsuarioService} from '../../services/usuario.service';
import {IniciousuarioComponent} from '../inicio/iniciousuario/iniciousuario.component';
import {InicioadministradorComponent} from '../inicio/inicioadministrador/inicioadministrador.component';
import {DatosService} from '../../services/datos.service';
import {LoginService} from '../../services/login.service';
import {RequestDto} from '../../model/request-dto';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {ResponseDto} from '../../model/response-dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    IniciousuarioComponent,
    InicioadministradorComponent,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  title = 'AdventoursV2';
  usuarios: Usuario[] = [];
  Tiporol:string ='';

  //Seguridad
  username: string = '';
  password: string = '';
  loginForm: FormGroup;
  fb = inject(FormBuilder);
  loginService: LoginService = inject(LoginService);
  constructor(private datosService: DatosService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  usuarioService: UsuarioService  = inject(UsuarioService);
  router: Router = inject(Router);

  ngOnInit() {
    // Cargar los usuarios desde el servicio cuando el componente se inicializa
    this.usuarioService.list().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    });
    //seguridad
    if(localStorage.getItem('token')!=null){
      localStorage.removeItem('token');
      console.log("Token eliminado");
    }
    this.loadForm()
  }

  loadForm(): void {
    console.log("Form");
  }

  onLogin() {
    if (this.loginForm.valid) {
      const requestDto: RequestDto = new RequestDto();
      requestDto.username = this.loginForm.value.username;
      requestDto.password = this.loginForm.value.password;

      this.loginService.login(requestDto).subscribe({
        next: (data: ResponseDto): void => {
          console.log("Login response ROLs:", data.roles);
          console.log("Login response ROL:", data.roles[0]);
          localStorage.setItem('rol', data.roles[0]);
          this.Tiporol = data.roles[0];
          alert("Login ok!");

          // Buscar el usuario en la lista
          const usuario = this.usuarios.find(user => user.nombreUsuario === this.loginForm.value.username);

          if (usuario) {

            if (this.Tiporol === "ROLE_USER") {
              this.datosService.nombre = usuario.nombreUsuario;
              this.datosService.idvalor = usuario.idUsuario;
              this.router.navigate(['iniciousuario']);
            }
            if (this.Tiporol === "ROLE_ADMIN") {
              this.datosService.nombre = usuario.nombreUsuario;
              this.datosService.idvalor = usuario.idUsuario;
              this.router.navigate(['inicioadministrador']);
            } else {
              // Rol incorrecto
              alert('Rol incorrecto para este usuario.');
              return;
            }

            // Limpia los campos de entrada
            this.username = '';
            this.password = '';
          } else {
            alert('Usuario o contraseña incorrectos');
          }
        },
        error: (err) => {
          console.error("Error en el login:", err);
          alert('Error al iniciar sesión, verifique sus credenciales.');
        }
      });
    }
  }
  onRegister() {
    this.router.navigate(['creacioncuenta']);
  }
}
