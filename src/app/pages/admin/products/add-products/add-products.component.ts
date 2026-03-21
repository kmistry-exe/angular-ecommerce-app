import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  ProductStatus,
  ValidationMessages,
} from '../../../../shared/enums/enum';
import { ProductFormComponent } from '../../../../shared/components/product-form/product-form.component';
import { formatISODate } from '../../../../shared/utils/date.utils';

@Component({
  selector: 'app-add-products',
  imports: [CommonModule, ReactiveFormsModule, ProductFormComponent],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css',
})
export class AddProductsComponent {
  Mode = Mode;

  productForm!: FormGroup<{
    name: FormControl<string>;
    categoryId: FormControl<number | null>;
    price: FormControl<number | null>;
    stock: FormControl<number | null>;
    description: FormControl<string>;
  }>;

  categoryOptions: { label: string; value: number }[] = [];

  formErrorMessages = ValidationMessages;

  @Input() mode: Mode.CREATE | Mode.UPDATE = Mode.CREATE;
  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.nonNullable.group({
      name: ['', [Validators.required]],
      categoryId: [null as number | null, [Validators.required]],
      price: [null as number | null, [Validators.required, Validators.min(1)]],
      stock: [null as number | null, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
    });

    this.loadCategories();
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

    const formValue = this.productForm.getRawValue();

    const productData = {
      id: Date.now(),
      name: formValue.name,
      categoryId: Number(formValue.categoryId),
      price: formValue.price ?? 0,
      stock: formValue.stock ?? 0,
      description: formValue.description,
      status: ProductStatus.ACTIVE,
      createdAt: formatISODate(new Date()),
    };

    this.productService.addProduct(productData as any).subscribe({
      next: () => {
        this.productForm.reset({
          categoryId: null,
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
