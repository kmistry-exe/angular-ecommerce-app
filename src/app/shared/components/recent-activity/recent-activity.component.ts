import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { PaginationComponent } from '../pagination/pagination-component';
import { ColumnType, ColumnAlign, OrderStatus, ProductStatus } from '../../enums/enum';

export interface Column {
  key: string;
  label: string;
  type?: ColumnType;
  align?: ColumnAlign;
  class?: string;
}

@Component({
  selector: 'app-recent-activity',
  imports: [CommonModule, PageHeaderComponent, PaginationComponent],
  templateUrl: './recent-activity.component.html'
})
export class RecentActivityComponent implements OnInit, OnChanges {
  @Input() title: string = 'Recent Activity';
  @Input() items: any[] = [];
  @Input() columns: Column[] = [];
  @Input() pageSize: number = 5;

  currentPage: number = 1;
  totalPages: number = 1;
  paginatedItems: any[] = [];

  ngOnInit() {
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] || changes['pageSize']) {
      this.updatePagination();
    }
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.items.length / this.pageSize) || 1;
    this.goToPage(1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    this.paginatedItems = this.items.slice(startIndex, startIndex + this.pageSize);
  }

  getStatusClasses(status: string): string {
    if (status === OrderStatus.DELIVERED || status === ProductStatus.ACTIVE) {
      return 'bg-green-100 text-green-700';
    }

    if (status === OrderStatus.PENDING) {
      return 'bg-yellow-100 text-yellow-700';
    }

    if (status === OrderStatus.SHIPPED) {
      return 'bg-indigo-100 text-indigo-700';
    }

    if (status === OrderStatus.CANCELLED || status === ProductStatus.INACTIVE) {
      return 'bg-red-100 text-red-600';
    }

    return 'bg-gray-100 text-gray-600';
  }
}
