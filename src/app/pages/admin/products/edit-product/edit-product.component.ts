import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { Router } from '@angular/router';

import { ProductCategory, ValidationMessages } from '../../../../shared/enums/enum';
import { ProductFormComponent } from '../../../../shared/components/product-form/product-form.component';

@Component({
  selector: 'app-edit-product',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductFormComponent
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private productService: ProductService, private router: Router) { }

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

  ngOnInit(): void {
    this.productForm = this.fb.nonNullable.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: [null as number | null, [Validators.required, Validators.min(1)]],
      stock: [null as number | null, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]]
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productId = +id;

      this.productService.getProductById(this.productId).subscribe({
        next: (product) => {
          console.log('Edit Product:', product);
          this.originalProduct = product;
          this.productForm.patchValue(product);
        },
        error: (err) => {
          console.error('Error loading product:', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
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
        console.log('Product updated successfully');
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        console.error('Update Product Error:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/products']);
  }

  get f() {
    return this.productForm.controls;
  }
}
