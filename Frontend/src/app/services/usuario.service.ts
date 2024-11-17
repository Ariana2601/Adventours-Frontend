import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Usuario} from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = environment.apiUrl+"/api";
  //para el uso de HttClient se debe registrar en app.config.ts cómo provider a
  // provideHttpClient()
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Usuario[]>();

  constructor() { }

  list():Observable<any>{
    return this.http.get(this.url + "/usuarios/listarUsuarios");
  }
  listIngresoSistema():Observable<any>{
    return this.http.get(this.url + "/usuarios/LogueoUsuario");
  }
  insert(usuario:Usuario): Observable<any>{
    return this.http.post(this.url + "/usuarios/registrarUsuario", usuario);
  }
  update(usuario:Usuario): Observable<any>{
    return this.http.put(this.url + "/usuarios/modificarUsuario", usuario);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/usuarios/eliminarUsuario/" + id);
  }
  setList(listaNueva : Usuario[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  //para mostrar obtener el destino por nombre
  listId(id: number): Observable<any>{
    console.log(this.url + "/usuario/" + id)
    return this.http.get<Usuario[]>(this.url + "/usuario/" + id);
  }

}
