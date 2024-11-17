import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Empresa} from '../model/empresa';
import {Usuario} from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private url = environment.apiUrl+"/api";
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Empresa[]>();

  constructor() { }

  list():Observable<any>{
    return this.http.get(this.url + "/empresas/listarEmpresas");
  }
  insert(empresa:Empresa): Observable<any>{
    return this.http.post(this.url + "/empresas/insertarEmpresa", empresa);
  }
  update(empresa:Empresa): Observable<any>{
    return this.http.put(this.url + "/empresas/modificarEmpresa", empresa);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/empresas/eliminarEmpresa/" + id);
  }
  empresaporid(id: number):Observable<any>{
    return this.http.get(this.url + "/empresas/obtenerEmpresaPorId/" + id);
  }
  obtenerdetallesdestino(id: number):Observable<any>{
    return this.http.get(this.url + "/destinos/" + id + "/detalles");
  }
  setList(listaNueva : Empresa[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
}
