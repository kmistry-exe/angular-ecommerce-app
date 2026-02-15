import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  productId!: number;
  productForm!: FormGroup;

  mockProduct = {
    name: 'Sample Product',
    category: 'Electronics',
    price: 999,
    stock: 25,
    description: 'This is a sample product description'
  };

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [''],
      category: [''],
      price: [''],
      stock: [''],
      description: ['']
    });

    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.productId) {
      this.productForm.patchValue(this.mockProduct);
    }
  }
}
