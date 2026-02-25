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

  isLoading = false;
  errorMessage: string = '';

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.errorMessage = 'Failed to load products';
        this.isLoading = false;
      }
    });
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

  confirmDelete(): void {
    if (!this.selectedProduct) {
      console.error('No product selected for deletion');
      return;
    }

    this.productService.deleteProduct(this.selectedProduct.id).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        this.products = this.products.filter(
          p => p.id !== this.selectedProduct.id
        );

        this.closeDeleteModal();
      },
      error: (err) => {
        console.error('Delete API Error:', err);
      }
    });
  }
}
