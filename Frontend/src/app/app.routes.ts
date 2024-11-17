// src/app/app.router.ts

import { Routes } from '@angular/router';
import { IniciousuarioComponent } from './componente/inicio/iniciousuario/iniciousuario.component';
import { CreacioncuentaComponent } from './componente/creacioncuenta/creacioncuenta.component';
import { InicioadministradorComponent } from './componente/inicio/inicioadministrador/inicioadministrador.component';
import {LoginComponent} from './componente/login/login.component';
import {ListasComponent} from './componente/listas/listas.component';
import {ModificarusuarioComponent} from './componente/modificarusuario/modificarusuario.component';
import {RecomendacionesComponent} from './componente/recomendaciones/recomendaciones.component';
import {PopularesComponent} from './componente/populares/populares.component';
import {ModificardestinoComponent} from './componente/modificardestino/modificardestino.component';
import {ModificarempresaComponent} from './componente/modificarempresa/modificarempresa.component';
import {DetallesdestinoComponent} from './componente/detallesdestino/detallesdestino.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },  // Ruta predeterminada
  { path: 'iniciousuario', component: IniciousuarioComponent },
  { path: 'inicioadministrador', component: InicioadministradorComponent },
  { path: 'creacioncuenta', component: CreacioncuentaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listas', component: ListasComponent },
  { path: 'inicioadministrador/:id', component: InicioadministradorComponent},
  { path: 'modificardestino/:id', component: ModificardestinoComponent},
  { path: 'modificarusuario/:id', component: ModificarusuarioComponent},
  { path: 'modificarempresa/:id', component: ModificarempresaComponent},
  { path: 'recomendaciones', component: RecomendacionesComponent },
  { path: 'populares', component: PopularesComponent },
  { path: 'detallesdestino', component: DetallesdestinoComponent },
];
