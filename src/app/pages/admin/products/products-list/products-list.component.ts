import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Product,
  ProductService,
} from '../../../../core/services/product.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { InputButtonComponent } from '../../../../shared/components/input-button/input-button.component';
import { AddProductsComponent } from '../add-products/add-products.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-products-list',
  imports: [
    CommonModule,
    PageHeaderComponent,
    InputButtonComponent,
    AddProductsComponent,
    EditProductComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    ConfirmationModalComponent,
    CardComponent,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;

  selectedProduct: any = null;
  products: Product[] = [];
  errorMessage: string = '';

  constructor(
    private router: Router,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.errorMessage = 'Failed to load products';
      },
    });
  }

  getStatusClass(status: string): string {
    return status === 'Active'
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-600';
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
          (p) => p.id !== this.selectedProduct.id,
        );

        this.closeDeleteModal();
      },
      error: (err) => {
        console.error('Delete API Error:', err);
      },
    });
  }

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  openEditModal(product: any): void {
    this.selectedProduct = product;
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedProduct = null;
  }

  updateProductTable(updatedProduct: any): void {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);

    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }
}
