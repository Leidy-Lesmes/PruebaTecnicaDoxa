import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product | undefined>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    // Obtener el producto del estado local
    this.product$ = this.productService.products$.pipe(
      map(products => products.find(p => p.id === id))
    );
  }

  ngOnInit(): void {
    // No es necesario cargar el producto manualmente
  }
}