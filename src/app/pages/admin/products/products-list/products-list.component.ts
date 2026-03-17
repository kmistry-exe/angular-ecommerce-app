import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { PaginationComponent } from '../../../../shared/components/pagination/pagination-component';
import { LoadingService } from '../../../../core/services/loading.service';
import { ProductStatus } from '../../../../shared/enums/enum';

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
    PaginationComponent,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  isPageLoading = false;

  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;

  selectedProduct: any = null;
  products: Product[] = [];

  currentPage = 1;
  pageSize = 6;

  errorMessage: string = '';
  categories: any[] = [];

  constructor(
    private productService: ProductService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Fetch Categories Error:', err);
      },
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find((c) => c.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products.sort((a, b) => {
          const dateSort = b.createdAt.localeCompare(a.createdAt);
          return dateSort !== 0 ? dateSort : b.id - a.id;
        });
      },
      error: (err) => {
        console.error('API Error:', err);
        this.errorMessage = 'Failed to load products';
      },
    });
  }

  getStatusClass(status: string): string {
    return status === ProductStatus.ACTIVE
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
        this.productService.getProducts().subscribe({
          next: (products) => {
            // Sort and update list
            this.products = products.sort((a, b) => b.id - a.id);

            // Adjust current page if the deleted item was the last one on that page
            const totalPages = Math.ceil(this.products.length / this.pageSize);
            if (this.currentPage > totalPages && totalPages > 0) {
              this.currentPage = totalPages;
            } else if (this.products.length === 0) {
              this.currentPage = 1;
            }

            this.closeDeleteModal();
          },
          error: (err) => {
            console.error('API Error after delete:', err);
            this.closeDeleteModal();
          },
        });
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
    this.loadProducts();
  }

  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.products.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.pageSize);
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
}
