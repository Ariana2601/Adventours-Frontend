import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Preferencia} from '../model/preferencia';
import {PreferenciaRequest} from '../model/preferencia-request';

@Injectable({
  providedIn: 'root'
})
export class PreferenciasService {
  private url = environment.apiUrl+"/api";
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  list(id: number):Observable<any>{
    return this.http.get(this.url + "/preferencias/buscarPreferencias/" + id);
  }
  insert(preferenciarequest:PreferenciaRequest): Observable<any>{
    return this.http.post(this.url + "/preferencias/insertarPreferencias", preferenciarequest);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/preferencias/eliminarPreferenciasPorUsuarioId/" + id);
  }
}
