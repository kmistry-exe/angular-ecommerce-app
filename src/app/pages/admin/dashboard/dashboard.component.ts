import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StatCardComponent } from '../../../components/stat-card/stat-card.component';
import { DashboardChartComponent } from './dashboard-chart/dashboard-chart.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, StatCardComponent, DashboardChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  stats = [
    { label: 'Total Orders', value: 1245 },
    { label: 'Revenue', value: 82400, prefix: '₹' },
    { label: 'Customers', value: 540 },
    { label: 'Products', value: 128 },
  ];
}
