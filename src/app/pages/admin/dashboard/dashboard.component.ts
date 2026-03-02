import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StatCardComponent } from '../../../components/stat-card/stat-card.component';
import { DashboardChartComponent } from './dashboard-chart/dashboard-chart.component';
import { DashboardRecentOrdersComponent } from './dashboard-recent-orders/dashboard-recent-orders.component';
import { Product, ProductService } from '../../../core/services/product.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, StatCardComponent, DashboardChartComponent, DashboardRecentOrdersComponent, PageHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  stats = [
    { label: 'Total Products', value: 0 },
    { label: 'Total Stock Value', value: 0, prefix: '₹' }
  ];

  isLoading = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadAnalytics();
  }

  private loadAnalytics(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        const totalProducts = products.length;

        const totalStockValue = products.reduce((total, product) => {
          return total + (product.price * product.stock);
        }, 0);

        this.stats = [
          { label: 'Total Products', value: totalProducts },
          { label: 'Total Stock Value', value: totalStockValue, prefix: '₹' }
        ];

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
