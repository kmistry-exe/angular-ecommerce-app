import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import {
  RecentActivityComponent,
  Column,
} from '../../../shared/components/recent-activity/recent-activity.component';
import {
  Product,
  ProductService,
} from '../../../core/services/product.service';
import { Order, OrderService } from '../../../core/services/order.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';
import {
  OrderStatus,
  ColumnType,
  ColumnAlign,
} from '../../../shared/enums/enum';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    StatCardComponent,
    RecentActivityComponent,
    PageHeaderComponent,
    ErrorStateComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  errorMessage: string = '';
  stats: { label: string; value: number; prefix?: string }[] = [
    { label: 'Total Products', value: 0 },
    { label: 'Total Orders', value: 0 },
    { label: 'Completed Orders', value: 0 },
    { label: 'Total Users', value: 1250 },
  ];

  recentOrders: Order[] = [];
  recentOrdersColumns: Column[] = [
    { key: 'id', label: 'Order ID' },
    { key: 'customerName', label: 'Customer' },
    { key: 'date', label: 'Date', type: ColumnType.DATE },
    {
      key: 'amount',
      label: 'Amount',
      type: ColumnType.CURRENCY,
      align: ColumnAlign.RIGHT,
    },
    {
      key: 'status',
      label: 'Status',
      type: ColumnType.STATUS,
      align: ColumnAlign.CENTER,
    },
  ];

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  private loadAnalytics(): void {
    forkJoin({
      products: this.productService.getProducts(),
      orders: this.orderService.getOrders(),
    }).subscribe({
      next: ({ products, orders }) => {
        const totalProducts = products.length;
        const totalOrders = orders.length;
        const completedOrders = orders.filter(
          (o) => o.status === OrderStatus.DELIVERED,
        ).length;

        this.stats = [
          { label: 'Total Products', value: totalProducts },
          { label: 'Total Orders', value: totalOrders },
          { label: 'Completed Orders', value: completedOrders },
          { label: 'Total Users', value: 1250 },
        ];

        this.recentOrders = [...orders].sort((a, b) => b.id - a.id);
      },
      error: () => {
        this.errorMessage = 'Failed to load dashboard analytics';
      },
    });
  }
}
