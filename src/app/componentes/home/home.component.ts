import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../servicos/session-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nomeUsuario : string;
  jaCadastrado: boolean;

  constructor(private storage: LocalStorageService) {
    this.nomeUsuario  = "";
    this.jaCadastrado = true;
  }

  ngOnInit(): void {
    const cadastrado = this.storage.get(this.storage.chavePrincipal) || "";
    if(cadastrado) {
      this.jaCadastrado = false;
    }
  }

  registrarIdentificacao() : void {
    if(!this.nomeUsuario) {
      alert("Obrigatório. Identifique-se com nome completo.");
      return;
    }

    this.nomeUsuario = this.nomeUsuario.trim();

    if(this.nomeUsuario.length <= 3 || !this.nomeUsuario.includes(" ")){
      alert("Nome para identificação parece inválido.");
      return;
    }

    this.storage.clear();
    this.storage.set(this.storage.chavePrincipal, this.nomeUsuario?.toString());

    alert("Identificação feito com sucesso.");
    this.jaCadastrado = false;
  }
}
