import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/Product.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatButtonModule, 
    TablerIconsModule,
    MatTooltip,
    MatIconModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.products$;
  }

  ngOnInit() {
    // No es necesario cargar productos manualmente ahora
  }

  deleteProduct(id?: number) {
    if (!id) return;
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id);
    }
  }
}