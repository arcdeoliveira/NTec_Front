import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargoCadastroComponent } from '../componentes/cargos/cadastro/cargo-cadastro.component';
import { CargoDetalheComponent } from '../componentes/cargos/detalhe/cargo-detalhe.component';
import { CargoListaComponent } from '../componentes/cargos/lista/cargo-lista.component';
import { ColaboradorCadastroComponent } from '../componentes/colaboradores/colaborador-cadastro/colaborador-cadastro.component';
import { ColaboradorDetalheComponent } from '../componentes/colaboradores/colaborador-detalhe/colaborador-detalhe.component';
import { ColaboradorListaComponent } from '../componentes/colaboradores/colaborador-lista/colaborador-lista.component';
import { ColaboradorOrganogramaComponent } from '../componentes/colaboradores/colaborador-organograma/colaborador-organograma.component';
import { HomeComponent } from '../componentes/home/home.component';
import { SetorCadastroComponent } from '../componentes/setores/cadastro/setor-cadastro.component';
import { SetorDetalheComponent } from '../componentes/setores/detalhe/setor-detalhe.component';
import { SetorListaComponent } from '../componentes/setores/lista/setor-lista.component';

const routes: Routes = [
  { path: "home",  component: HomeComponent },
  { path: "cargos", component: CargoListaComponent },
  { path: "setores",  component: SetorListaComponent },
  { path: "colaboradores",  component: ColaboradorListaComponent },
  { path: "organograma",  component: ColaboradorOrganogramaComponent },
  { path: "cargo/:id",  component: CargoDetalheComponent },
  { path: "colaborador/:id", component: ColaboradorDetalheComponent },
  { path: "setor/:id", component: SetorDetalheComponent },
  { path: "cargo/cadastro/novo", component: CargoCadastroComponent },
  { path: "colaborador/cadastro/novo", component: ColaboradorCadastroComponent },
  { path: "setor/cadastro/novo", component: SetorCadastroComponent },
  { path: "", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
