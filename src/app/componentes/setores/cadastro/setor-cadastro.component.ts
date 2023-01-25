import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/servicos/session-storage.service';
import { SetorService } from 'src/app/servicos/setor.service';
import { mensagem } from 'src/app/uteis/mensagem';

@Component({
  selector: 'app-setor-cadastro',
  templateUrl: './setor-cadastro.component.html',
  styleUrls: ['./setor-cadastro.component.css']
})
export class SetorCadastroComponent implements OnInit {
  setorNome: string;

  constructor(private setorService: SetorService, private router: Router, private storageService: LocalStorageService) { 
    this.setorNome = "";
  }

  ngOnInit(): void {
    const usuario = this.storageService.get(this.storageService.chavePrincipal) || "";
    if(!usuario) {
      alert(mensagem.naoIdentificado)
      this.router.navigate(["/home"])

      return;
    }
  }

  salvarSetor(){
    if(!this.setorNome){
      alert("Setor ".concat(mensagem.campoObrigatorio));
      return;
    }

    if(this.setorNome.length > 100){
      alert("Setor nome ".concat(mensagem.campoMaximo100));
      return;
    }

    const data = {
      nome: this.setorNome,
    };

    let that = this;

    this.setorService.create(data)
    .subscribe({
      next(data) {
        alert(data.mensagem)
        that.setorNome  = "";       
      },
      error(error) {
        console.error(error);
        alert(error.error);
      }
    });
  }
}
