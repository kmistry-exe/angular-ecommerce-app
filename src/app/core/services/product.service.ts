import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor() { }

  private products: Product[] = [
    {
      id: 1,
      name: 'iPhone 14',
      category: 'Electronics',
      price: 999,
      stock: 10,
      description: 'Latest Apple smartphone',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Nike Shoes',
      category: 'Fashion',
      price: 120,
      stock: 25,
      description: 'Comfortable running shoes',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Office Chair',
      category: 'Home',
      price: 200,
      stock: 15,
      description: 'Ergonomic office chair',
      status: 'Inactive'
    }

  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  addProduct(product: Product): void {
    const newId = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    product.id = newId;
    this.products.push(product);
  }

  updateProduct(product: Product): void {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
    }
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  status: string;
}

