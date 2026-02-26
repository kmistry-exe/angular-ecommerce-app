import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private productService: ProductService, private router: Router) { }

  productId!: number;
  originalProduct: any;
  productForm!: FormGroup;

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [''],
      category: [''],
      price: [null],
      stock: [null],
      description: ['']
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
}
