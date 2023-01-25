import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CargoService } from 'src/app/servicos/cargo.service';
import { LocalStorageService } from 'src/app/servicos/session-storage.service';
import { mensagem } from 'src/app/uteis/mensagem';

@Component({
  selector: 'app-cargo-detalhe',
  templateUrl: './cargo-detalhe.component.html',
  styleUrls: ['./cargo-detalhe.component.css']
})
export class CargoDetalheComponent implements OnInit {
  botaoHabilitado: boolean;
  cargoNome: string;
  id: string | undefined | null;
  usuario: string | null;


  constructor(private cargoService: CargoService, private router: Router, private activatedRoute: ActivatedRoute, 
                                                                          private storageService: LocalStorageService) {
    this.botaoHabilitado = false;
    this.cargoNome       = "";
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

    this.obterCargo();
  }

  obterCargo(): void {   
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!this.id) {
      this.mensagemErro();
      return;
    }

    let that = this;

    this.cargoService.getById(+this.id)
    .subscribe({
      next(data) {        
        that.cargoNome = data.objeto;       
      },
      error(error) {
        console.error(error);
        alert(error.error);

        that.botaoHabilitado = true;        
        that.cargoNome = "";
      }
    });
  }

  editarCargo(): void {
    if(!this.cargoNome){
      alert("Cargo ".concat(mensagem.campoObrigatorio));
      return;
    }

    if(this.cargoNome.length > 100){
      alert("Cargo nome ".concat(mensagem.campoMaximo100));
      return;
    }

    const data = {
      id:  this.id === null || this.id === undefined ? 0:  parseInt(this.id),
      alteradoPor: this.usuario,
      nome: this.cargoNome,
    };

    var that = this;

    this.cargoService.update(data).subscribe({
      next() {        
           alert("Cargo ".concat(mensagem.edicaoSucesso));
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
