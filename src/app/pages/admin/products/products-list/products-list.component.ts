import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  constructor(private router: Router) { }
  products: Product[] = [
    { id: 1, name: 'iPhone 15', category: 'Electronics', price: 79999, stock: 25, status: 'Active' },
    { id: 2, name: 'Nike Air Max', category: 'Footwear', price: 5999, stock: 50, status: 'Active' },
    { id: 3, name: 'Leather Wallet', category: 'Accessories', price: 1499, stock: 0, status: 'Inactive' },
    { id: 4, name: 'Samsung TV', category: 'Electronics', price: 45999, stock: 10, status: 'Active' }
  ];

  getStatusClass(status: string): string {
    return status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600';
  }

  onEdit(id: number) {
    this.router.navigate(['/admin/products/edit', id]);
  }
}
