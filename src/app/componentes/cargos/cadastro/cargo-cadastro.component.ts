import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CargoService } from 'src/app/servicos/cargo.service';
import { LocalStorageService } from 'src/app/servicos/session-storage.service';
import { mensagem } from 'src/app/uteis/mensagem';

@Component({
  selector: 'app-cargo-cadastro',
  templateUrl: './cargo-cadastro.component.html',
  styleUrls: ['./cargo-cadastro.component.css']
})
export class CargoCadastroComponent implements OnInit {
  cargoNome: string;

  constructor(private cargoService: CargoService, private router: Router, private storageService: LocalStorageService) {
    this.cargoNome = "";
  }

  ngOnInit(): void {
    const usuario = this.storageService.get(this.storageService.chavePrincipal) || "";
    if(!usuario) {
      alert(mensagem.naoIdentificado)
      this.router.navigate(["/home"])

      return;
    }
  }

  salvarCargo(){
    if(!this.cargoNome){
      alert("Cargo ".concat(mensagem.campoObrigatorio));
      return;
    }

    if(this.cargoNome.length > 100){
      alert("Cargo nome ".concat(mensagem.campoMaximo100));
      return;
    }

    const data = {
      nome: this.cargoNome,
    };

    let that = this;

    this.cargoService.create(data)
    .subscribe({
      next(data) {
        alert(data.mensagem)
        that.cargoNome  = "";       
      },
      error(error) {
        console.error(error);
        alert(error.error);
      }
    });
  }
}
