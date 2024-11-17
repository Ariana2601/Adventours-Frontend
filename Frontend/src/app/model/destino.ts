import {Usuario} from './usuario';
import {Empresa} from './empresa';

export class Destino {
  idDestino : number;
  nombre: string;
  descripcion : string;
  clima : string;
  presupuesto : string;
  actividades : string;
  ritmoViaje : string;
  tipoViaje: string;
  popularidad: number;
  usuario: Usuario;
  empresa: Empresa;

}
