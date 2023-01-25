import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/servicos/session-storage.service';
import { SetorService } from 'src/app/servicos/setor.service';
import { mensagem } from 'src/app/uteis/mensagem';

@Component({
  selector: 'app-setor-detalhe',
  templateUrl: './setor-detalhe.component.html',
  styleUrls: ['./setor-detalhe.component.css']
})
export class SetorDetalheComponent implements OnInit {
  botaoHabilitado: boolean;
  setorNome: string;
  id: string | undefined | null;
    usuario: string | null;

  constructor(private setorService: SetorService, private router: Router, private activatedRoute: ActivatedRoute, 
                                                                          private storageService: LocalStorageService) {
    this.botaoHabilitado = false;
    this.setorNome       = "";
    this.usuario         = "";
  }

  ngOnInit(): void {
    this.usuario = this.storageService.get(this.storageService.chavePrincipal) || "";
    
    if(!this.usuario) {
      alert(mensagem.naoIdentificado)
      this.router.navigate(["/home"])

      return;
    }

    if (!this.activatedRoute.snapshot.paramMap.has('id')) {
      this.mensagemErro();
      return;
    }

    this.obterSetor();
  }

  obterSetor(): void {   
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!this.id) {
      this.mensagemErro();
      return;
    }

    let that = this;

    this.setorService.getById(+this.id)
    .subscribe({
      next(data) {        
        that.setorNome = data.objeto;       
      },
      error(error) {
        console.error(error);
        alert(error.error);

        that.botaoHabilitado = true;        
        that.setorNome = "";
      }
    });
  }

  editarSetor(): void {
    if(!this.setorNome){
      alert("Setor ".concat(mensagem.campoObrigatorio));
      return;
    }

    if(this.setorNome.length > 100){
      alert("Setor nome ".concat(mensagem.campoMaximo100));
      return;
    }

    const data = {
      id:  this.id === null || this.id === undefined ? 0:  parseInt(this.id),
      alteradoPor: this.usuario,
      nome: this.setorNome,
    };

    var that = this;

    this.setorService.update(data).subscribe({
      next() {        
           alert("Setor ".concat(mensagem.edicaoSucesso));
           that.botaoHabilitado = true;
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
