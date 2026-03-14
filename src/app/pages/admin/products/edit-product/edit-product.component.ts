import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import {
  Mode,
  ProductCategory,
  ValidationMessages,
} from '../../../../shared/enums/enum';
import { ProductFormComponent } from '../../../../shared/components/product-form/product-form.component';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, ReactiveFormsModule, ProductFormComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
    Mode = Mode;
  
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {}

  productForm!: FormGroup<{
    name: FormControl<string>;
    category: FormControl<string>;
    price: FormControl<number | null>;
    stock: FormControl<number | null>;
    description: FormControl<string>;
  }>;

  categoryOptions = [
    { label: ProductCategory.ELECTRONICS, value: ProductCategory.ELECTRONICS },
    { label: ProductCategory.FASHION, value: ProductCategory.FASHION },
    { label: ProductCategory.HOME, value: ProductCategory.HOME },
    { label: ProductCategory.BOOKS, value: ProductCategory.BOOKS },
  ];
  formErrorMessages = ValidationMessages;

  productId!: number;
  originalProduct: any;

  @Input() product: any;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  @Input() mode: Mode.UPDATE | Mode.CREATE = Mode.UPDATE;

  isLoading = true;

  ngOnInit(): void {
    this.productForm = this.fb.nonNullable.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: [null as number | null, [Validators.required, Validators.min(1)]],
      stock: [null as number | null, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
    });

    if (this.product) {
      this.productId = this.product.id;
      this.originalProduct = this.product;

      this.productForm.patchValue(this.product);
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    if (!this.productId) {
      console.error('No product ID found');
      return;
    }

    const updatedProduct = {
      ...this.originalProduct,
      ...this.productForm.value,
      id: this.productId,
    };

    this.productService.updateProduct(updatedProduct).subscribe({
      next: () => {
        this.save.emit(updatedProduct);
        this.close.emit();
      },
      error: (err) => {
        console.error('Update Product Error:', err);
      },
    });
  }

  onCancel(): void {
    this.close.emit();
  }

  get f() {
    return this.productForm.controls;
  }
}
