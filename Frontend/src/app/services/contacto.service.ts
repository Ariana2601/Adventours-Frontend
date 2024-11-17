import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contacto} from '../model/contacto';
import {Hucontacto} from '../model/hucontacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private url = environment.apiUrl+"/api";
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  list():Observable<any>{
    return this.http.get(this.url + "/contactos/listarContactos");
  }
  insert(contacto:Contacto): Observable<any>{
    return this.http.post(this.url + "/contactos/insertarContactos", contacto);
  }
  hucontacto(hucontacto:Hucontacto): Observable<any>{
    return this.http.post(this.url + "/contactos/enviarMensaje", hucontacto);
  }
}
