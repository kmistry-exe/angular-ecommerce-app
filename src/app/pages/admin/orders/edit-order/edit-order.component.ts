import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import {
  ProductService,
  Product,
} from '../../../../core/services/product.service';
import { OrderService } from '../../../../core/services/order.service';
import {
  Mode,
  OrderStatus,
  ProductStatus,
  ValidationMessages,
} from '../../../../shared/enums/enum';
import { OrderFormComponent } from '../../../../shared/components/order-form/order-form.component';
import { formatISODate } from '../../../../shared/utils/date.utils';

@Component({
  selector: 'app-edit-order',
  imports: [CommonModule, ReactiveFormsModule, OrderFormComponent],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css',
})
export class EditOrderComponent implements OnInit {
  Mode = Mode;

  orderForm!: FormGroup<{
    customerName: FormControl<string>;
    productId: FormControl<number | null>;
    quantity: FormControl<number>;
    amount: FormControl<number>;
    status: FormControl<OrderStatus>;
    createdAt: FormControl<string>;
  }>;

  formErrorMessages = ValidationMessages;

  @Input() mode: Mode.CREATE | Mode.UPDATE = Mode.UPDATE;
  @Input() order: any;

  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  products: Product[] = [];

  productOptions: { label: string; value: number }[] = [];

  statusOptions = Object.values(OrderStatus).map((status) => ({
    label: status,
    value: status,
  }));

  orderId!: number;
  originalOrder: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService,
  ) {}

  setupValidators(): void {
    this.orderForm.controls.productId.valueChanges.subscribe((productId) => {
      this.updateQuantityValidator(productId as number);
      this.calculateAmount();
    });

    this.orderForm.controls.quantity.valueChanges.subscribe(() => {
      this.calculateAmount();
    });
  }

  updateQuantityValidator(productId: number): void {
    const selectedProduct = this.products.find((p) => p.id === productId);
    const quantityControl = this.orderForm.controls.quantity;

    if (selectedProduct) {
      quantityControl.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(selectedProduct.stock),
      ]);
    } else {
      quantityControl.setValidators([Validators.required, Validators.min(1)]);
    }
    quantityControl.updateValueAndValidity({ emitEvent: false });
  }

  ngOnInit(): void {
    this.orderForm = this.fb.nonNullable.group({
      customerName: ['', Validators.required],
      productId: [null as number | null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      amount: [{ value: 0, disabled: true }],
      status: [OrderStatus.PENDING],
      createdAt: [''],
    });

    if (this.order) {
      this.orderId = this.order.id;
      this.originalOrder = this.order;

      this.orderForm.patchValue({
        customerName: this.order.customerName,
        productId: this.order.productId,
        quantity: this.order.quantity,
        amount: this.order.amount,
        status: this.order.status,
        createdAt: this.order.createdAt,
      });
    }

    this.loadProducts();
    this.setupValidators();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      const currentProductId = this.orderForm.controls.productId.value;
      this.products = products.filter(
        (p) => p.status === ProductStatus.ACTIVE || p.id === currentProductId,
      );

      this.productOptions = this.products.map((p) => ({
        label: p.name,
        value: p.id,
      }));

      this.updateQuantityValidator(currentProductId as number);
      this.calculateAmount();
    });
  }

  calculateAmount(): void {
    const productId = this.orderForm.controls.productId.value;
    const quantity = this.orderForm.controls.quantity.value;

    const selectedProduct = this.products.find((p) => p.id === productId);

    if (selectedProduct) {
      // Cap the quantity to the product's maximum stock for amount calculation
      let effectiveQuantity = quantity;
      if (quantity > selectedProduct.stock) {
        effectiveQuantity = selectedProduct.stock;
      }

      const amount = selectedProduct.price * effectiveQuantity;

      this.orderForm.patchValue({ amount }, { emitEvent: false });
    }
  }

  onSubmit(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    if (!this.orderId) {
      console.error('No order ID found');
      return;
    }

    const formValue = this.orderForm.getRawValue();

    const updatedOrder = {
      ...this.originalOrder,
      customerName: formValue.customerName,
      productId: formValue.productId,
      quantity: formValue.quantity,
      amount: formValue.amount,
      status: formValue.status,
      createdAt: formValue.createdAt
        ? formatISODate(new Date(formValue.createdAt))
        : formatISODate(new Date()),
      id: this.orderId,
    };

    this.orderService.updateOrder(updatedOrder as any).subscribe({
      next: () => {
        this.save.emit(updatedOrder);
        this.close.emit();
      },
      error: (err) => {
        console.error('Update Order Error:', err);
      },
    });
  }

  onCancel(): void {
    this.close.emit();
  }

  get f() {
    return this.orderForm.controls;
  }
}
