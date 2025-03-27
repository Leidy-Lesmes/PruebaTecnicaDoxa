import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/Product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }
  

  deleteProduct(id?: number) {
    if (!id) return;
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(p => p.id !== id);
      });
    }
  }
  
}