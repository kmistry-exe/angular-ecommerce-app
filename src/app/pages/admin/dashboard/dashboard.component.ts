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
import { Router } from '@angular/router';
import { ViewOrderComponent } from '../orders/view-order/view-order.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    StatCardComponent,
    RecentActivityComponent,
    PageHeaderComponent,
    ErrorStateComponent,
    ViewOrderComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  errorMessage: string = '';
  showViewModal = false;
  selectedOrder: Order | null = null;
  isDemoMode = false;
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
    { key: 'createdAt', label: 'Date', type: ColumnType.DATE },
    {
      key: 'amount',
      label: 'Amount',
      type: ColumnType.CURRENCY,
      align: ColumnAlign.CENTER,
    },
    {
      key: 'status',
      label: 'Status',
      type: ColumnType.STATUS,
      align: ColumnAlign.CENTER,
    },
    {
      key: 'action',
      label: 'Action',
      type: ColumnType.ACTION,
      align: ColumnAlign.RIGHT,
    },
  ];

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.isDemoMode = this.authService.isDemoMode();
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

        this.recentOrders = [...orders].sort((a, b) => {
          const dateSort = b.createdAt.localeCompare(a.createdAt);
          return dateSort !== 0 ? dateSort : b.id - a.id;
        });
      },
      error: () => {
        this.errorMessage = 'Failed to load dashboard analytics';
      },
    });
  }

  viewAllOrders() {
    this.router.navigate(['/admin/orders']);
  }

  viewOrder(order: Order) {
    this.selectedOrder = order;
    this.showViewModal = true;
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedOrder = null;
  }
}
