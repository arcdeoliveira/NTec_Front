import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/servicos/colaborador.service';
import { LocalStorageService } from 'src/app/servicos/session-storage.service';
import { mensagem } from 'src/app/uteis/mensagem';
import { ColaboradorNode } from '../../../modelos/colaboradores/colaborador-node'

@Component({
  selector: 'app-colaborador-organograma',
  templateUrl: './colaborador-organograma.component.html',
  styleUrls: ['./colaborador-organograma.component.css']
})
export class ColaboradorOrganogramaComponent implements OnInit {
    tree: ColaboradorNode;
    invisivel: boolean;

    mensagemDeAguarde: string;
    mostrarMensagem?: boolean;
  

    constructor(private colaboradorService: ColaboradorService, private router: Router, private storageService: LocalStorageService) {
        this.invisivel = true;        

        this.mensagemDeAguarde = mensagem.listaCarregamento;   
        this.tree              =  { 
            name: "", 
            children: []
        }; 
    
        const usuario = this.storageService.get(this.storageService.chavePrincipal) || "";
        if(!usuario) {      
            alert(mensagem.naoIdentificado)      
            this.router.navigate(["/home"])
      
            return;    
        }
    }
  
    ngOnInit(): void {     
        this.mostrarMensagem = true;

        let that  = this;

        this.colaboradorService.getDataToChart().subscribe({
            next(data) {
                that.tree = data as ColaboradorNode
            },
            error(err) {
                console.error(err)
                alert(err.err);
            },
            complete ()
            {
              that.mostrarMensagem = false
            }
        })
    }






}


