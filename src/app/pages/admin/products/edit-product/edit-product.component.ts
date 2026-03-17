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
import { Mode, ValidationMessages } from '../../../../shared/enums/enum';
import { ProductFormComponent } from '../../../../shared/components/product-form/product-form.component';
import { formatISODate } from '../../../../shared/utils/date.utils';

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
    categoryId: FormControl<number | null>;
    price: FormControl<number | null>;
    stock: FormControl<number | null>;
    description: FormControl<string>;
  }>;

  categoryOptions: { label: string; value: number }[] = [];
  formErrorMessages = ValidationMessages;

  productId!: number;
  originalProduct: any;

  @Input() product: any;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  @Input() mode: Mode.UPDATE | Mode.CREATE = Mode.UPDATE;

  ngOnInit(): void {
    this.productForm = this.fb.nonNullable.group({
      name: ['', [Validators.required]],
      categoryId: [null as number | null, [Validators.required]],
      price: [null as number | null, [Validators.required, Validators.min(1)]],
      stock: [null as number | null, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
    });

    this.loadCategories();

    if (this.product) {
      this.productId = this.product.id;
      this.originalProduct = this.product;

      this.productForm.patchValue({
        name: this.product.name,
        categoryId: this.product.categoryId,
        price: this.product.price,
        stock: this.product.stock,
        description: this.product.description,
      });
    }
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categoryOptions = categories.map((cat) => ({
          label: cat.name,
          value: cat.id,
        }));
      },
      error: (err) => {
        console.error('Fetch Categories Error:', err);
      },
    });
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

    const formValue = this.productForm.getRawValue();

    const updatedProduct = {
      ...this.originalProduct,
      name: formValue.name,
      categoryId: formValue.categoryId,
      price: formValue.price,
      stock: formValue.stock,
      description: formValue.description,
      id: this.productId,
      createdAt: this.originalProduct.createdAt
        ? formatISODate(new Date(this.originalProduct.createdAt))
        : formatISODate(new Date()),
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
