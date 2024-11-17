import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private datosname: string = '';
  private datosdestino: string = '';
  private idusuario: number = 0;
  constructor() { }

  get nombredestino(): string {
    return this.datosdestino;
  }

  set nombredestino(value: string) {
    this.datosdestino = value;
  }
  get nombre(): string {
    return this.datosname;
  }

  set nombre(value: string) {
    this.datosname = value;
  }

  get idvalor(): number {
    return this.idusuario;
  }

  set idvalor(value: number) {
    this.idusuario = value;
  }
}
//Codigo terminado
