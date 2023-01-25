import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mensagem-processamento',
  templateUrl: './mensagem-processamento.component.html',
  styleUrls: ['./mensagem-processamento.component.css']
})
export class MensagemProcessamentoComponent {
  @Input() mensagem = ''
}
