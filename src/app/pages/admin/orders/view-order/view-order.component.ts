import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../core/services/order.service';
import { ProductService } from '../../../../core/services/product.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { InputButtonComponent } from '../../../../shared/components/input-button/input-button.component';
import { InputViewComponent } from '../../../../shared/components/input-view/input-view.component';

@Component({
  selector: 'app-view-order',
  imports: [
    CommonModule,
    PageHeaderComponent,
    InputButtonComponent,
    InputViewComponent,
  ],
  templateUrl: './view-order.component.html',
})
export class ViewOrderComponent implements OnInit {
  @Input() order: any = null;
  @Output() closeView = new EventEmitter<void>();

  errorMessage: string = '';
  products: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });

    if (this.order) return;

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.orderService.getOrderById(+id).subscribe({
        next: (order) => {
          this.order = order;
        },
        error: () => {
          this.errorMessage = 'Failed to load order details';
        },
      });
    }
  }

  getProductName(productId: number): string {
    const product = this.products.find((p) => p.id === productId);
    return product ? product.name : 'Unknown Product';
  }

  close() {
    if (this.closeView.observed) {
      this.closeView.emit();
    } else {
      this.router.navigate(['/admin/orders']);
    }
  }
}
