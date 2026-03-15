import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderService } from '../../../../core/services/order.service';
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
  @Input() order: Order | null = null;
  @Output() closeView = new EventEmitter<void>();

  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
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

  close() {
    if (this.closeView.observed) {
      this.closeView.emit();
    } else {
      this.router.navigate(['/admin/orders']);
    }
  }
}
