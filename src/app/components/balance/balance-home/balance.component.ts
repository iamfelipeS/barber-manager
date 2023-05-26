import { Component, OnInit } from '@angular/core';
import { Servico } from '../../servicos/servico.model';
import { ServicoService } from '../../servicos/servico.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})

export class BalanceComponent implements OnInit {
  selectedMonth: string;
  months: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  servicos: Servico[] = [];

  constructor(private servicoService: ServicoService) { 
    this.selectedMonth = this.months[0]; 
  }

  ngOnInit(): void {
    this.getServicos();
  }

  getServicos(): void {
    this.servicoService.load().subscribe(servicos => {
      this.servicos = servicos;
    });
  }

  getTotalEntradas(): number {
    return this.servicos
      .filter(servico => servico.price && servico.price > 0)
      .reduce((total, servico) => total + servico.price!, 0);
  }

  getTotalDespesas(): number {
    return this.servicos
      .filter(servico => servico.price && servico.price < 0)
      .reduce((total, servico) => total + servico.price!, 0);
  }

  getTotal(): number {
    return this.servicos.reduce((total, servico) => total + (servico.price || 0), 0);
  }
}
