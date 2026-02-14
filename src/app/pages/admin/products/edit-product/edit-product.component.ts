import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  imports: [],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  constructor(private route: ActivatedRoute) { }

  productId!: number;

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Editing product ID:', this.productId);
  }

  mockProduct = {
    name: 'Sample Product',
    category: 'Electronics',
    price: 999,
    stock: 25,
    description: 'This is a sample product description'
  };

}
