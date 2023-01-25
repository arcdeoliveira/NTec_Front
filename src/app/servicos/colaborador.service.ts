import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColaboradorFiltro } from '../modelos/colaboradores/colaborador-filtro';
import { ColaboradorPaginacao } from '../modelos/colaboradores/colaborador-paginacao';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {
   private colaboradorUrl = 'http://localhost:5027/colaborador';  

  constructor(private http : HttpClient) { }

  getById(id: string) : Observable<any> {
    const url = `${this.colaboradorUrl}/${id}`;
    return this.http.get<any>(url);
  }

  getAll(filtro: ColaboradorFiltro) : Observable<ColaboradorPaginacao> {
    const url = `${this.colaboradorUrl}/paginacao`;

    let parametros = new HttpParams();
        parametros = parametros.append("paginaNumero", filtro.numeroPagina);
        parametros = parametros.append("paginaquantidade", filtro.quantidadePagina);

    if (filtro.cargoId) {
      parametros = parametros.append("cargoId", filtro.cargoId);
    }

    if (filtro.chefe != null) {
      parametros = parametros.append("chefe", filtro.chefe);
    }    

    if (filtro.cpf) {
      parametros = parametros.append("cpf", filtro.cpf);
    }

    if (filtro.genero) {
      parametros = parametros.append("genero", filtro.genero);
    }    

    if (filtro.nome) {
      parametros = parametros.append("nome", filtro.nome.trim());
    }

    if (filtro.setorId) {
      parametros = parametros.append("setorId", filtro.setorId);
    }

    return this.http.get<ColaboradorPaginacao>(url, {params:parametros});
  }

  getDropDown() : Observable<any[]> {
    const url = `${this.colaboradorUrl}/dropdown`;
    return this.http.get<any>(url);
  }

  getDataToChart(): Observable<any> {
    const url = `${this.colaboradorUrl}/organograma`;
    return this.http.get<any>(url);
  }

  create(data: any): Observable<any> {
    const url = `${this.colaboradorUrl}/registrar`;
    return this.http.post<any>(url, data);
  }

  update(data: any): Observable<any> {
    const url = `${this.colaboradorUrl}/editar`;
    return this.http.put<any>(url, data);
  }

  delete(data: any): Observable<any> {
    const url     = `${this.colaboradorUrl}/deletar`;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: data
    };
    
    return this.http.delete<any>(url, options);
  }
}
