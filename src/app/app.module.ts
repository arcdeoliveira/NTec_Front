import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './rotas/app-routing.module';
import { AppComponent } from './app.component';
import { CargoListaComponent } from './componentes/cargos/lista/cargo-lista.component';
import { SetorListaComponent } from './componentes/setores/lista/setor-lista.component';
import { ColaboradorListaComponent } from './componentes/colaboradores/colaborador-lista/colaborador-lista.component';
import { HomeComponent } from './componentes/home/home.component';
import { CargoCadastroComponent } from './componentes/cargos/cadastro/cargo-cadastro.component';
import { CargoDetalheComponent } from './componentes/cargos/detalhe/cargo-detalhe.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { SetorDetalheComponent } from './componentes/setores/detalhe/setor-detalhe.component';
import { SetorCadastroComponent } from './componentes/setores/cadastro/setor-cadastro.component';
import { ColaboradorCadastroComponent } from './componentes/colaboradores/colaborador-cadastro/colaborador-cadastro.component';
import { ColaboradorDetalheComponent } from './componentes/colaboradores/colaborador-detalhe/colaborador-detalhe.component';
import { ColaboradorOrganogramaComponent } from './componentes/colaboradores/colaborador-organograma/colaborador-organograma.component';

import { OrgChartModule } from 'angular13-organization-chart';
import { MensagemProcessamentoComponent } from './componentes/mensagens/processamento/mensagem-processamento.component';


@NgModule({
  declarations: [
    AppComponent,
    CargoListaComponent,
    SetorListaComponent,
    ColaboradorListaComponent,
    HomeComponent,
    CargoCadastroComponent,
    CargoDetalheComponent,
    NavbarComponent,
    SetorDetalheComponent,
    SetorCadastroComponent,
    ColaboradorCadastroComponent,
    ColaboradorDetalheComponent,
    ColaboradorOrganogramaComponent,
    MensagemProcessamentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OrgChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
