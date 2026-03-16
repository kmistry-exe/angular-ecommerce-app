import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { InputButtonComponent } from '../../../../shared/components/input-button/input-button.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination-component';
import { Order, OrderService } from '../../../../core/services/order.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { OrderStatus } from '../../../../shared/enums/enum';
import { AddOrderComponent } from '../add-order/add-order.component';
import { EditOrderComponent } from '../edit-order/edit-order.component';
import { ViewOrderComponent } from '../view-order/view-order.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  imports: [
    CommonModule,
    PageHeaderComponent,
    InputButtonComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    ConfirmationModalComponent,
    CardComponent,
    PaginationComponent,
    AddOrderComponent,
    EditOrderComponent,
    ViewOrderComponent,
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css',
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  selectedOrder: any = null;

  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  showViewModal = false;

  currentPage = 1;
  pageSize = 6;

  errorMessage: string = '';

  constructor(
    private orderService: OrderService,
    private loadingService: LoadingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders.sort((a, b) => b.id - a.id);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.errorMessage = 'Failed to load orders';
      },
    });
  }

  openDeleteModal(order: any): void {
    this.selectedOrder = order;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedOrder = null;
  }
  confirmDelete(): void {
    if (!this.selectedOrder) {
      console.error('No order selected for deletion');
      return;
    }

    this.orderService.deleteOrder(this.selectedOrder.id).subscribe({
      next: () => {
        this.orderService.getOrders().subscribe({
          next: (orders) => {
            // Sort and update list
            this.orders = orders.sort((a, b) => b.id - a.id);
            
            // Adjust current page if the deleted item was the last one on that page
            const totalPages = Math.ceil(this.orders.length / this.pageSize);
            if (this.currentPage > totalPages && totalPages > 0) {
              this.currentPage = totalPages;
            } else if (this.orders.length === 0) {
              this.currentPage = 1;
            }
            
            this.closeDeleteModal();
          },
          error: (err) => {
            console.error('API Error after delete:', err);
            this.closeDeleteModal();
          }
        });
      },
      error: (err) => {
        console.error('Delete API Error:', err);
      },
    });
  }

  get paginatedOrders(): Order[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.orders.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.orders.length / this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    this.loadingService.show();

    setTimeout(() => {
      this.currentPage = page;

      this.loadingService.hide();

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 200);
  }

  getStatusClass(status: string): string {
    if (status === OrderStatus.DELIVERED) {
      return 'bg-green-100 text-green-700';
    }

    if (status === OrderStatus.PENDING) {
      return 'bg-yellow-100 text-yellow-700';
    }

    if (status === OrderStatus.SHIPPED) {
      return 'bg-indigo-100 text-indigo-700';
    }

    if (status === OrderStatus.CANCELLED) {
      return 'bg-red-100 text-red-600';
    }

    return 'bg-gray-100 text-gray-600';
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  openEditModal(order: any): void {
    this.selectedOrder = order;
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedOrder = null;
  }

  viewOrder(order: any): void {
    this.selectedOrder = order;
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedOrder = null;
  }

  handleOrderSaved(): void {
    this.loadOrders();
    this.closeAddModal();
  }
}
