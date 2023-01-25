import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradorCadastro } from 'src/app/modelos/colaboradores/colaborador-cadastro';
import { Selecionador } from 'src/app/modelos/comum/selecionador';
import { CargoService } from 'src/app/servicos/cargo.service';
import { ColaboradorService } from 'src/app/servicos/colaborador.service';
import { LocalStorageService } from 'src/app/servicos/session-storage.service';
import { SetorService } from 'src/app/servicos/setor.service';
import { dropdown } from 'src/app/uteis/dropdown';
import { mensagem } from 'src/app/uteis/mensagem';

@Component({
  selector: 'app-colaborador-cadastro',
  templateUrl: './colaborador-cadastro.component.html',
  styleUrls: ['./colaborador-cadastro.component.css']
})
export class ColaboradorCadastroComponent  implements OnInit{
  colaborador: ColaboradorCadastro;
  cargos: Selecionador[];
  colaboradores: Selecionador[];
  setores: Selecionador[];
  generos: Selecionador[];

  constructor(private cargoService: CargoService, private colaboradorService: ColaboradorService, private router: Router, 
    private setorService: SetorService, private storageService: LocalStorageService) {
    this.colaborador = { genero: 0};

    this.cargos        = [];
    this.colaboradores = []; 
    this.setores       = [];
    this.generos       = dropdown.genero;
  }

  ngOnInit(): void {
    const usuario = this.storageService.get(this.storageService.chavePrincipal) || "";

    if(!usuario) {
      alert(mensagem.naoIdentificado)
      this.router.navigate(["/home"])

      return;
    }

    this.getCargosParaFiltro();
    this.getSetoresParaFiltro();
    this.getColaboradoresParaFiltro();
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

  getColaboradoresParaFiltro(): void {
    let that = this;

    this.colaboradorService.getDropDown()
    .subscribe({
      next(data) {
        that.colaboradores = data;
      },
      error(error) {
        console.error(error);
        alert(error);

        that.colaboradores  = [];
      }
    });
  }

  cadastrarColaborador(): void {
    if (!this.colaborador.aniversario) {
      alert("Aniversário é obrigatório. Por favor informe");
      return;
    }

    if (!this.colaborador.cargoId) {
      alert("Cargo é obrigatório. Por favor informe");
      return;
    }

    if (!this.colaborador.nome) {
      alert("Nome obrigatório. Por favor informe");
      return;
    }

    if (this.colaborador.nome.length > 50) {
      alert("Máximo de 50 caracteres para o campo nome.");
      return;
    }

    if (!this.colaborador.sobreNome) {
      alert("Sobrenome obrigatório. Por favor informe");
      return;
    }

    if (this.colaborador.sobreNome.length > 150) {
      alert("Máximo de 150 caracteres para o campo sobrenome.");
      return;
    }

    if (!this.colaborador.cpf) {
      alert("Cpf obrigatório. Por favor informe");
      return;
    }

    if (this.colaborador.cpf.toString().length != 11) {
      alert("Cpf para estar inválido.");
      return;
    }

     if (!this.colaborador.aniversario) {
      alert("Aniversário é obrigatório. Por favor informe");
      return;
    }


    if (!this.colaborador.setorId) {
      alert("Setor é obrigatório. Por favor informe");
      return;
    }

    let that = this;

    this.colaboradorService.create(this.colaborador)
    .subscribe({
      next(data) {
        alert(data.mensagem)
        that.colaborador  = { genero: 0 };       
      },
      error(error) {
        console.error(error);
        alert(error.error);
      }
    });
  }
}
