import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SetorConsulta } from 'src/app/modelos/setores/setor-consulta';
import { SetorFiltro } from 'src/app/modelos/setores/setor-filtro';
import { LocalStorageService } from 'src/app/servicos/session-storage.service';
import { SetorService } from 'src/app/servicos/setor.service';
import { dropdown } from 'src/app/uteis/dropdown';
import { mensagem } from 'src/app/uteis/mensagem';

@Component({
  selector: 'app-setor-lista',
  templateUrl: './setor-lista.component.html',
  styleUrls: ['./setor-lista.component.css']
})
export class SetorListaComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;

  filtro: SetorFiltro;
  setores: SetorConsulta[];
  caption: string; 
  quantidades: number[];
  idParaExclusao: number;
  textoParaExclusao: string;
  usuario: string | null

  mensagemDeAguarde: string;
  mostrarMensagem?: boolean;

  constructor(private storageService: LocalStorageService, private router: Router, private setorService: SetorService) {
    this.filtro      = this.getDefaultFiltro();
    this.setores     = []; 
    this.caption     = "";   
    this.quantidades = dropdown.paginacao;

    this.idParaExclusao    = 0;
    this.textoParaExclusao = "";
    this.usuario           = "";
    this.mensagemDeAguarde = mensagem.listaCarregamento;   
  }

  ngOnInit(): void {
    this.usuario = this.storageService.get(this.storageService.chavePrincipal) || "";
    if(!this.usuario) {
      alert(mensagem.naoIdentificado)
      this.router.navigate(["/home"])

      return;
    }

    this.getSetores();
  }

  getSetores() : void {
    this.mostrarMensagem = true;

    let that = this;

    this.setorService.getAll(this.filtro)
    .subscribe({
      next(data) {
        that.setores  = data.objetos;
        that.caption = data.total.toString().concat(mensagem.setorCaption);
      },
      error(error) {
        console.error(error);
        alert(error.error);

        that.filtro  = that.getDefaultFiltro();
        that.setores  = [];
        that.caption = "0".concat(mensagem.setorCaption);
      },
      complete ()
      {
        that.mostrarMensagem = false
      }
    });
  }

  prepararExclusao(id: number, nome: string) {
    this.idParaExclusao    = id;
    this.textoParaExclusao = "Tem certeza que deseja excluir setor: " + nome + "?";
  }

  exclusaoSetor(): void { 
    const data = {
      id:  this.idParaExclusao,
      excluidoPor: this.usuario,
    };

    let that = this;
    that.closebutton.nativeElement.click();

    this.setorService.delete(data).subscribe({
      next() {               
          alert("Setor ".concat(mensagem.exclusaoSucesso));
          that.getSetores();
      },
      error(error) {
        console.error(error);
        alert(error.error);
      }
    });
  }

  getDefaultFiltro(): SetorFiltro
  {
    return {
      nome: '',
      numeroPagina: 1,
      quantidadePagina: 10
    }
  }
}
