import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradorConsulta } from 'src/app/modelos/colaboradores/colaborador-consulta';
import { ColaboradorFiltro } from 'src/app/modelos/colaboradores/colaborador-filtro';
import { Selecionador } from 'src/app/modelos/comum/selecionador';
import { CargoService } from 'src/app/servicos/cargo.service';
import { ColaboradorService } from 'src/app/servicos/colaborador.service';
import { LocalStorageService } from 'src/app/servicos/session-storage.service';
import { SetorService } from 'src/app/servicos/setor.service';
import { dropdown } from 'src/app/uteis/dropdown';
import { mensagem } from 'src/app/uteis/mensagem';

@Component({
  selector: 'app-colaborador-lista',
  templateUrl: './colaborador-lista.component.html',
  styleUrls: ['./colaborador-lista.component.css']
})
export class ColaboradorListaComponent {
  @ViewChild('closebutton') closebutton: any;

  filtro: ColaboradorFiltro;
  cargos: Selecionador[];
  colaboradores: ColaboradorConsulta[];
  caption: string; 
  escolhas: Selecionador[];
  quantidades: number[];
  idParaExclusao: string;
  setores: Selecionador[];
  textoParaExclusao: string;
  usuario: string | null
  generos: Selecionador[];

  mensagemDeAguarde: string;
  mostrarMensagem?: boolean;

  constructor(private storageService: LocalStorageService, private router: Router, private cargoService: CargoService, 
    private colaboradorService: ColaboradorService, private setorService: SetorService) {
    this.filtro        = this.getDefaultFiltro();
    this.cargos        = [];
    this.colaboradores = []; 
    this.setores       = [];

    this.escolhas    = dropdown.escolha;
    this.generos     = dropdown.genero;
    this.quantidades = dropdown.paginacao;

    this.caption           = "";   
    this.idParaExclusao    = "";
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

    this.getCargosParaFiltro();
    this.getSetoresParaFiltro();
    this.getColaboradores();
  }

  getColaboradores() : void {
    this.mostrarMensagem = true;

    let that = this;

    this.colaboradorService.getAll(this.filtro)
    .subscribe({
      next(data) {
        that.colaboradores = data.objetos;
        that.caption       = data.total.toString().concat(mensagem.colaboradorCaption);
      },
      error(error) {
        console.error(error);
        alert(error.error);

        that.colaboradores = [];
        that.caption       = "0".concat(mensagem.colaboradorCaption);
      },
      complete ()
      {
        that.mostrarMensagem = false
      }
    });
  }

  getCargosParaFiltro() : void {
    let that = this;

    this.cargoService.getDropDown()
    .subscribe({
      next(data) {
        that.cargos = data;
      },
      error(error) {
        console.error(error);
        alert(error);

        that.cargos  = [];
      }
    });
  }

  getSetoresParaFiltro() : void {
    let that = this;

    this.setorService.getDropDown()
    .subscribe({
      next(data) {
        that.setores = data;
      },
      error(error) {
        console.error(error);
        alert(error);

        that.setores  = [];
      }
    });
  }

  prepararExclusao(id: string, nome: string) {
    this.idParaExclusao    = id;
    this.textoParaExclusao = "Tem certeza que deseja excluir colaborador: " + nome + "?";
  }

  exclusaoColaborador(): void { 
    const data = {
      id:  this.idParaExclusao,
      excluidoPor: this.usuario,
    };

    let that = this;
    that.closebutton.nativeElement.click();

    this.colaboradorService.delete(data).subscribe({
      next() {               
          alert("Colaborador ".concat(mensagem.exclusaoSucesso));
          that.getColaboradores();
      },
      error(error) {
        console.error(error);
        alert(error.error);
      }
    });
  }

  getDefaultFiltro(): ColaboradorFiltro
  {
    return {
      cargoId: null,
      chefe: null,
      genero: null,
      nome: '',
      numeroPagina: 1,
      quantidadePagina: 10,
      setorId: null
    }
  }
}
