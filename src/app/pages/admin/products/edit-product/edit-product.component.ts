import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private productService: ProductService) { }

  productId!: number;
  productForm!: FormGroup;

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [''],
      category: [''],
      price: [''],
      stock: [''],
      description: ['']
    });

    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    const product = this.productService.getProductById(this.productId);

    if (product) {
      this.productForm.patchValue(product);
    }
  }
}
