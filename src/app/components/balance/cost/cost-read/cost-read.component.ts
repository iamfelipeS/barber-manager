import { Component, OnInit, ViewChild } from '@angular/core';
import { Cost } from '../cost.model';
import { CostService } from '../cost.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReloadService } from 'src/app/services/reload.service';

@Component({
  selector: 'app-cost-read',
  templateUrl: './cost-read.component.html',
  styleUrls: ['./cost-read.component.scss'],
})
export class CostReadComponent implements OnInit {
  costs: Cost[] = [];
  isMobile = false;
  dataSource: MatTableDataSource<Cost>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['description', 'value', 'date', 'action'];
  displayedColumnsMobile = ['description', 'value', 'action'];

  constructor(
    private costService: CostService,
    private breakpointObserver: BreakpointObserver,
    private reloadService: ReloadService
  ) {
    this.dataSource = new MatTableDataSource(this.costs);
  }

  ngOnInit(): void {
    this.loadCosts();
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
    this.reloadService.reloadParent$.subscribe(() => {
      this.loadCosts();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadCosts(): void {
    this.costService.getAllCosts().subscribe(
      (costs: Cost[]) => {
        this.costs = costs;
        this.dataSource.data = costs;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  update(id: string): void {
    this.costService.isUpdate = true;
    this.costService.id = id;
    this.costService.isCreate = false;
    this.costService.isDelete = false;
    this.reloadService.reloadParent();
  }

  delete(id: string): void {
    this.costService.isUpdate = false;
    this.costService.id = id;
    this.costService.isCreate = false;
    this.costService.isDelete = true;
    this.reloadService.reloadParent();
  }
}
