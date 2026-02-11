import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
}

@Component({
  selector: 'app-dashboard-recent-orders',
  imports: [CommonModule],
  templateUrl: './dashboard-recent-orders.component.html',
  styleUrl: './dashboard-recent-orders.component.css'
})

export class DashboardRecentOrdersComponent {

  orders: Order[] = [
    { id: '#1001', customer: 'Rahul Sharma', date: '2026-02-10', amount: 3200, status: 'Completed' },
    { id: '#1002', customer: 'Priya Patel', date: '2026-02-09', amount: 1850, status: 'Pending' },
    { id: '#1003', customer: 'Amit Verma', date: '2026-02-08', amount: 4999, status: 'Cancelled' },
    { id: '#1004', customer: 'Sneha Joshi', date: '2026-02-07', amount: 2750, status: 'Completed' },
    { id: '#1005', customer: 'Karan Mehta', date: '2026-02-06', amount: 1500, status: 'Pending' }
  ];

  getStatusClasses(status: string): string {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return '';
    }
  }
}

