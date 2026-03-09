import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StatCardComponent } from '../../../components/stat-card/stat-card.component';
import { DashboardChartComponent } from './dashboard-chart/dashboard-chart.component';
import { DashboardRecentOrdersComponent } from './dashboard-recent-orders/dashboard-recent-orders.component';
import {
  Product,
  ProductService,
} from '../../../core/services/product.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    StatCardComponent,
    DashboardChartComponent,
    DashboardRecentOrdersComponent,
    PageHeaderComponent,
    ErrorStateComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  errorMessage: string = '';
  stats = [
    { label: 'Total Products', value: 0 },
    { label: 'Total Stock Value', value: 0, prefix: '₹' },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  private loadAnalytics(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        const totalProducts = products.length;

        const totalStockValue = products.reduce((total, product) => {
          return total + product.price * product.stock;
        }, 0);

        this.stats = [
          { label: 'Total Products', value: totalProducts },
          { label: 'Total Stock Value', value: totalStockValue, prefix: '₹' },
        ];
      },
      error: () => {
        this.errorMessage = 'Failed to load dashboard analytics';
      },
    });
  }
}
