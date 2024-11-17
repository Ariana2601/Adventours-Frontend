import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from '../model/usuario';
import {Rol} from '../model/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url = environment.apiUrl+"/api";
  private http: HttpClient = inject(HttpClient);
  constructor() { }

  list():Observable<any>{
    return this.http.get(this.url + "/listarrol");
  }
  insert(usuario:Rol): Observable<any>{
    return this.http.post(this.url + "/rol", usuario);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/eliminarrol" + id);
  }

}
//terminado
