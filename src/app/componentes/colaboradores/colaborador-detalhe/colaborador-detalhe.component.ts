import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColaboradorAtualizar } from 'src/app/modelos/colaboradores/colaborador-atualizar';
import { Selecionador } from 'src/app/modelos/comum/selecionador';
import { CargoService } from 'src/app/servicos/cargo.service';
import { ColaboradorService } from 'src/app/servicos/colaborador.service';
import { LocalStorageService } from 'src/app/servicos/session-storage.service';
import { SetorService } from 'src/app/servicos/setor.service';
import { dropdown } from 'src/app/uteis/dropdown';
import { mensagem } from 'src/app/uteis/mensagem';

@Component({
  selector: 'app-colaborador-detalhe',
  templateUrl: './colaborador-detalhe.component.html',
  styleUrls: ['./colaborador-detalhe.component.css']
})
export class ColaboradorDetalheComponent {
  colaborador: ColaboradorAtualizar;
  cargos: Selecionador[];
  colaboradores: Selecionador[];
  setores: Selecionador[];
  generos: Selecionador[];

  botaoHabilitado: boolean;

  constructor(private cargoService: CargoService, private colaboradorService: ColaboradorService, private router: Router, 
    private setorService: SetorService, private storageService: LocalStorageService, private activatedRoute: ActivatedRoute) {
    this.colaborador     = { genero: 0};
    this.botaoHabilitado = false;

    this.cargos        = [];
    this.colaboradores = []; 
    this.setores       = [];
    this.generos       = dropdown.genero;
  }

  ngOnInit(): void {
    this.colaborador.alteradoPor = this.storageService.get(this.storageService.chavePrincipal) || "";

    if(!this.colaborador.alteradoPor) {
      alert(mensagem.naoIdentificado)
      this.router.navigate(["/home"])

      return;
    }

    if (!this.activatedRoute.snapshot.paramMap.has('id')) {
      this.mensagemErro();
      return;
    }

    this.getCargosParaFiltro();
    this.getSetoresParaFiltro();
    this.getColaboradoresParaFiltro();
    this.obterColaborador();
  }

  obterColaborador(): void {   
    this.colaborador.id =  this.activatedRoute.snapshot.paramMap.get('id');

    if (!this.colaborador.id) {
      this.mensagemErro();
      return;
    }

    let that = this;

    this.colaboradorService.getById(this.colaborador.id)
    .subscribe({
      next(data) {                
        that.colaborador.aniversario = data.aniversario.substring(0, 10);   
        that.colaborador.cargoId     = data.cargoId;       
        that.colaborador.chefeId     = data.chefeId;          
        that.colaborador.cpf         = data.cpf;       
        that.colaborador.genero      = data.genero;       
        that.colaborador.nome        = data.nome;       
        that.colaborador.sobreNome   = data.sobreNome;       
        that.colaborador.setorId     = data.setorId;     
      },
      error(error) {
        console.error(error);
        alert(error.error);

        that.botaoHabilitado = true;        
        that.colaborador     = { genero: 0 };
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
        alert(error.error);

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
        alert(error.error);

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
        alert(error.error);

        that.colaboradores  = [];
      }
    });
  }

  editarColaborador(): void {
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

    if (!this.colaborador.setorId) {
      alert("Setor é obrigatório. Por favor informe");
      return;
    }

    this.colaboradorService.update(this.colaborador)
    .subscribe({
      next() {
        alert("Colaborador ".concat(mensagem.edicaoSucesso));
      },
      error(error) {
        console.error(error);
        alert(error.error);
      }
    });
  }  

  mensagemErro() : void {
    alert(mensagem.idNaoEncontrado);
    this.botaoHabilitado = true;
  }
}
