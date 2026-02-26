import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';


@Component({
  selector: 'app-add-products',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})

export class AddProductsComponent {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(1)]],
      stock: [null, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    const productData = {
      ...this.productForm.value,
      status: 'Active'
    };

    this.productService.addProduct(productData).subscribe({
      next: () => {
        console.log('Product added successfully');

        this.productForm.reset({
          category: '',
          price: null,
          stock: null
        });


        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        console.error('Add Product Error:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/products']);
  }
}
