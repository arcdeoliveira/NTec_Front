import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CargoFiltro } from '../modelos/cargos/cargo-filtro';
import { CargoPaginacao } from '../modelos/cargos/cargo-paginacao';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
   private cargoUrl = 'http://localhost:5027/cargo';  

  constructor(private http : HttpClient) { }

  getById(id: number) : Observable<any> {
    const url = `${this.cargoUrl}/${id}`;
    return this.http.get<any>(url);
  }

  getAll(filtro: CargoFiltro) : Observable<CargoPaginacao> {
    const url = `${this.cargoUrl}/paginacao`;

    let parametros = new HttpParams();
        parametros = parametros.append("paginaNumero", filtro.numeroPagina);
        parametros = parametros.append("paginaquantidade", filtro.quantidadePagina);
    
    if (filtro.nome) {
      parametros = parametros.append("nome", filtro.nome.trim());
    }

    return this.http.get<CargoPaginacao>(url, {params:parametros});
  }

  getDropDown() : Observable<any[]> {
    const url = `${this.cargoUrl}/dropdown`;
    return this.http.get<any>(url);
  }

  create(data: any): Observable<any> {
    const url = `${this.cargoUrl}/registrar`;
    return this.http.post<any>(url, data);
  }

  update(data: any): Observable<any> {
    const url = `${this.cargoUrl}/editar`;
    return this.http.put<any>(url, data);
  }

  delete(data: any): Observable<any> {
    const url     = `${this.cargoUrl}/deletar`;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: data
    };
    
    return this.http.delete<any>(url, options);
  }
}
