import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SetorFiltro } from '../modelos/setores/setor-filtro';
import { SetorPaginacao } from '../modelos/setores/setor-paginacao';

@Injectable({
  providedIn: 'root'
})
export class SetorService {   
  private setorUrl = 'http://localhost:5027/setor';  

  constructor(private http : HttpClient) { }

  getById(id: number) : Observable<any> {
    const url = `${this.setorUrl}/${id}`;
    return this.http.get<any>(url);
  }

  getAll(filtro: SetorFiltro) : Observable<SetorPaginacao> {
    const url = `${this.setorUrl}/paginacao`;

    let parametros = new HttpParams();
        parametros = parametros.append("paginaNumero", filtro.numeroPagina);
        parametros = parametros.append("paginaquantidade", filtro.quantidadePagina);
    
    if (filtro.nome) {
      parametros = parametros.append("nome", filtro.nome.trim());
    }

    return this.http.get<SetorPaginacao>(url, {params:parametros});
  }

  getDropDown() : Observable<any[]> {
    const url = `${this.setorUrl}/dropdown`;
    return this.http.get<any>(url);
  }

  create(data: any): Observable<any> {
    const url = `${this.setorUrl}/registrar`;
    return this.http.post<any>(url, data);
  }

  update(data: any): Observable<any> {
    const url = `${this.setorUrl}/editar`;
    return this.http.put<any>(url, data);
  }

  delete(data: any): Observable<any> {
    const url     = `${this.setorUrl}/deletar`;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: data
    };
    
    return this.http.delete<any>(url, options);
  }
}
