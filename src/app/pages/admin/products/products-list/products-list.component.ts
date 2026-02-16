import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product, ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})

export class ProductsListComponent implements OnInit {
  showDeleteModal = false;
  selectedProduct: any = null;

  products: Product[] = [];

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  getStatusClass(status: string): string {
    return status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600';
  }

  onEdit(id: number) {
    this.router.navigate(['/admin/products/edit', id]);
  }

  openDeleteModal(product: any): void {
    this.selectedProduct = product;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedProduct = null;
  }
}
