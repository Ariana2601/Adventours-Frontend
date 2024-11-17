import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {IniciousuarioComponent} from './componente/inicio/iniciousuario/iniciousuario.component';
import {FormsModule} from '@angular/forms';
import {Usuario} from './model/usuario';
import {UsuarioService} from './services/usuario.service';
import {InicioadministradorComponent} from './componente/inicio/inicioadministrador/inicioadministrador.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, IniciousuarioComponent, FormsModule, InicioadministradorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'AdventoursV2';
/*
*
usuarios: Usuario[] = [];
username: string = '';
password: string = '';

constructor() {}
usuarioService: UsuarioService  = inject(UsuarioService);
router: Router = inject(Router);

ngOnInit() {
  // Cargar los usuarios desde el servicio cuando el componente se inicializa
  this.usuarioService.list().subscribe((data: Usuario[]) => {
    this.usuarios = data;
  });
}
onLogin() {
  const usuarioValido = this.usuarios.find(user => user.nombreUsuario === this.username && user.contrasena === this.password);
  if (usuarioValido) {
    // Redirige al componente "inicio" cuando las credenciales son correctas
    if (usuarioValido.rol.id === 1) {
      this.router.navigate(['iniciousuario']);
    }
    if (usuarioValido.rol.id === 2) {
      this.router.navigate(['inicioadministrador']);
    }
    // Limpia los campos de entrada
    this.username = '';
    this.password = '';
  } else {
    alert('Usuario o contraseña incorrectos');
  }
}

onRegister() {
  this.router.navigate(['creacioncuenta']);
}

* */
}

/*
* import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {IniciousuarioComponent} from './componente/inicio/iniciousuario/iniciousuario.component';
import {FormsModule} from '@angular/forms';
import {Usuario} from './model/usuario';
import {UsuarioService} from './services/usuario.service';
import {InicioadministradorComponent} from './componente/inicio/inicioadministrador/inicioadministrador.component';

@Component({
selector: 'app-root',
standalone: true,
imports: [RouterOutlet, RouterLink, IniciousuarioComponent, FormsModule, InicioadministradorComponent],
templateUrl: './app.component.html',
styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
title = 'AdventoursV2';
usuarios: Usuario[] = [];
username: string = '';
password: string = '';

constructor() {}
usuarioService: UsuarioService  = inject(UsuarioService);
router: Router = inject(Router);

ngOnInit() {
  // Cargar los usuarios desde el servicio cuando el componente se inicializa
  this.usuarioService.list().subscribe((data: Usuario[]) => {
    this.usuarios = data;
  });
}
onLogin() {
  // Validación simple de ejemplo (debería hacerse en un servidor en una aplicación real)
  const usuarioValido = this.usuarios.find(user => user.nombreUsuario === this.username && user.contrasena === this.password);
  if (usuarioValido) {
    // Redirige al componente "inicio" cuando las credenciales son correctas
    if(usuarioValido.rol.id===1)
      this.router.navigate(['iniciousuario']);
    if(usuarioValido.rol.id===2)
      this.router.navigate(['inicioadministrador']);
  } else {
    this.router.navigate(['iniciousuario']);
    alert('Usuario o contraseña incorrectos');

  }
}

onRegister() {
  this.router.navigate(['creacioncuenta']);
}
}
* */
