import { Component, EventEmitter, Output } from '@angular/core';
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
  ProductCategory,
  ValidationMessages,
} from '../../../../shared/enums/enum';
import { ProductFormComponent } from '../../../../shared/components/product-form/product-form.component';

@Component({
  selector: 'app-add-products',
  imports: [CommonModule, ReactiveFormsModule, ProductFormComponent],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css',
})
export class AddProductsComponent {
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

  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.nonNullable.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: [null as number | null, [Validators.required, Validators.min(1)]],
      stock: [null as number | null, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.getRawValue();

    const productData = {
      id: Date.now(), //TODO: Need to check and update
      name: formValue.name,
      category: formValue.category,
      price: formValue.price ?? 0,
      stock: formValue.stock ?? 0,
      description: formValue.description,
      status: 'Active',
    };

    this.productService.addProduct(productData).subscribe({
      next: () => {
        this.productForm.reset({
          category: '',
          price: null,
          stock: null,
        });

        this.save.emit();
        this.close.emit();
      },
      error: (err) => {
        console.error('Add Product Error:', err);
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
