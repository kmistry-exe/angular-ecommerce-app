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
import { formatDate } from '../../../../shared/utils/date.utils';

@Component({
  selector: 'app-add-order',
  imports: [CommonModule, ReactiveFormsModule, OrderFormComponent],
  templateUrl: './add-order.component.html',
})
export class AddOrderComponent {
  Mode = Mode;

  orderForm!: FormGroup<{
    customerName: FormControl<string>;
    product: FormControl<string>;
    quantity: FormControl<number>;
    amount: FormControl<number>;
    status: FormControl<OrderStatus>;
    date: FormControl<string>;
  }>;

  formErrorMessages = ValidationMessages;

  @Input() mode: Mode.CREATE | Mode.UPDATE = Mode.CREATE;

  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  products: Product[] = [];

  productOptions: { label: string; value: string }[] = [];

  statusOptions = Object.values(OrderStatus).map((status) => ({
    label: status,
    value: status,
  }));

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService,
  ) {}

  setupValidators(): void {
    this.orderForm.controls.product.valueChanges.subscribe((productName) => {
      this.updateQuantityValidator(productName);
      this.calculateAmount();
    });

    this.orderForm.controls.quantity.valueChanges.subscribe(() => {
      this.calculateAmount();
    });
  }

  updateQuantityValidator(productName: string): void {
    const selectedProduct = this.products.find((p) => p.name === productName);
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
      product: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      amount: [{ value: 0, disabled: true }],
      status:
        this.mode === Mode.CREATE
          ? [{ value: OrderStatus.PENDING, disabled: true }]
          : [OrderStatus.PENDING],
      date: [formatDate(new Date())],
    });

    this.loadProducts();
    this.setupValidators();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      const currentProduct = this.orderForm.controls.product.value;
      this.products = products.filter(
        (p) =>
          p.status === ProductStatus.ACTIVE ||
          (currentProduct && p.name === currentProduct),
      );

      this.productOptions = this.products.map((p) => ({
        label: p.name,
        value: p.name,
      }));

      this.updateQuantityValidator(currentProduct);
      this.calculateAmount();
    });
  }

  calculateAmount(): void {
    const product = this.orderForm.controls.product.value;
    const quantity = this.orderForm.controls.quantity.value;

    const selectedProduct = this.products.find((p) => p.name === product);

    if (selectedProduct) {
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

    const formValue = this.orderForm.getRawValue();

    const orderData = {
      id: Date.now(),
      ...formValue,
    };

    this.orderService.addOrder(orderData).subscribe({
      next: () => {
        this.orderForm.reset({
          customerName: '',
          product: '',
          quantity: 1,
          amount: 0,
          status: OrderStatus.PENDING,
          date: formatDate(new Date()),
        });

        this.save.emit();
        this.close.emit();
      },
      error: (err) => {
        console.error('Add Order Error:', err);
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
