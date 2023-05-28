import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CostService } from '../cost.service';
import { Cost } from '../cost.model';
import { ReloadService } from 'src/app/services/reload.service';

@Component({
  selector: 'app-cost-delete',
  templateUrl: './cost-delete.component.html',
  styleUrls: ['./cost-delete.component.scss'],
})
export class CostDeleteComponent implements OnInit {
  cost: Cost = {
    id: '',
    idCompany: '',
    value: 0,
    description: '',
    date: new Date(),
  };

  constructor(
    private costService: CostService,
    private reloadService: ReloadService
  ) {}

  ngOnInit(): void {
    this.costService.getById(this.costService.id).subscribe((cost: Cost) => {
      this.cost = cost;
    });
    this.reloadService.reloadParent$.subscribe(() => {
      this.reload();
    });
  }

  reload() {
    this.costService.getById(this.costService.id).subscribe((cost) => {
      console.log(cost);
      this.cost = cost;
    });
  }

  delete(): void {
    this.costService.delete(this.cost.id as string).subscribe(() => {
      this.costService.showMessage('Custo excluído!');
    });
    this.costService.isDelete = false;
    this.reloadService.reloadParent();
  }

  cancel(): void {
    this.costService.isDelete = false;
  }
}
