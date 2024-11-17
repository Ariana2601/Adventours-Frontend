// src/app/services/destino.service.ts
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Destino } from '../model/destino';
import {AsignarDestinoDto} from '../model/asignar-destino-dto';

@Injectable({
  providedIn: 'root'
})
export class DestinoService {
  private url = `${environment.apiUrl}/api/destinos`;
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Destino[]>();

  constructor() { }

  // Metodo para obtener destinos que coincidan con las preferencias del usuario
  getDestinos(preferencias: any): Observable<Destino[]> {
    const params = new HttpParams()
      .set('clima', preferencias.clima || '')
      .set('presupuesto', preferencias.presupuesto || '')
      .set('actividades', preferencias.actividades || '')
      .set('ritmoViaje', preferencias.ritmoViaje || '')
      .set('tipoViaje', preferencias.tipoViaje || '');

    return this.http.get<Destino[]>(`${this.url}/partialMatches`, { params });
  }

  // Métodos existentes...
  list(): Observable<any> {
    return this.http.get(`${this.url}/listarDestinos`);
  }

  listId(id: number): Observable<any>{
    return this.http.get<Destino[]>(this.url + "/obtenerDestinoPorId/" + id);
  }

  listPorNombre(nombre: string): Observable<Destino> {
    return this.http.get<Destino>(this.url + "/obtenerDestinoporNombre/" + nombre);
  }

  asignardestino(asignardestinooo: AsignarDestinoDto): Observable<any> {
    return this.http.post(this.url + '/asignarDestinoEmpresa', asignardestinooo);
  }

  insert(destino: Destino): Observable<any> {
    return this.http.post(this.url + "/insertarDestino", destino);
  }

  updateDestino(destino: Destino): Observable<any> {
    return this.http.put(`${this.url}/modificarDestino`, destino);
  }

  deleteDestino(id: number): Observable<any> {
    return this.http.delete(`${this.url}/eliminarDestino/${id}`);
  }

  destinosrecomendaciones(id: number): Observable<any> {
    return this.http.get(this.url + '/DestinosRecomendaciones/' + id);
  }
  //Regresa los destinos ordenados por popularidad
  destinospopulares(): Observable<any> {
    return this.http.get(`${this.url}/DestinosPopulares`);
  }
  setList(listaNueva : Destino[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
}
