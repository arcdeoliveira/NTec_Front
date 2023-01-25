import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CargoConsulta } from 'src/app/modelos/cargos/cargo-consulta';
import { CargoFiltro } from 'src/app/modelos/cargos/cargo-filtro';
import { CargoService } from 'src/app/servicos/cargo.service';
import { LocalStorageService } from 'src/app/servicos/session-storage.service';
import { dropdown } from 'src/app/uteis/dropdown';
import { mensagem } from 'src/app/uteis/mensagem';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargo-lista.component.html',
  styleUrls: ['./cargo-lista.component.css']
})
export class CargoListaComponent implements OnInit {  
  @ViewChild('closebutton') closebutton: any;

  filtro: CargoFiltro;
  cargos: CargoConsulta[];
  caption: string; 
  quantidades: number[];
  idParaExclusao: number;
  textoParaExclusao: string;
  usuario: string | null;

  mensagemDeAguarde: string;
  mostrarMensagem?: boolean;

  constructor(private storageService: LocalStorageService, private router: Router, private cargoService: CargoService) {
    this.filtro      = this.getDefaultFiltro();
    this.cargos      = []; 
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

    this.getCargos();
  }

  getCargos() : void {
    this.mostrarMensagem = true
    let that = this;

    this.cargoService.getAll(this.filtro)
    .subscribe({
      next(data) {
        that.cargos  = data.objetos;
        that.caption = data.total.toString().concat(mensagem.cargoCaption);
      },
      error(error) {
        console.error(error);
        alert(error.error);

        that.filtro  = that.getDefaultFiltro();
        that.cargos  = [];
        that.caption = "0".concat(mensagem.cargoCaption);
      },
      complete ()
      {
        that.mostrarMensagem = false
      }
    });
  }

  prepararExclusao(id: number, nome: string) {
    this.idParaExclusao    = id;
    this.textoParaExclusao = "Tem certeza que deseja excluir cargo: " + nome + "?";
  }

  exclusaoCargo(): void { 
    const data = {
      id:  this.idParaExclusao,
      excluidoPor: this.usuario,
    };

    let that = this;
    that.closebutton.nativeElement.click();


    this.cargoService.delete(data).subscribe({
      next() {   
          alert("Cargo ".concat(mensagem.exclusaoSucesso));
          that.getCargos();
      },
      error(error) {
        console.error(error);
        alert(error.error);
      }
    });
  }

  getDefaultFiltro(): CargoFiltro
  {
    return {
      nome: '',
      numeroPagina: 1,
      quantidadePagina: 10
    }
  }
}