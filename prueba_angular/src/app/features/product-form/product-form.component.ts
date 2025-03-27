import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
  imports: [
    ReactiveFormsModule
  ]
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false; 
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.productForm = this.fb.group({
      id: [{ value: 0, disabled: true }], 
      title: ['', Validators.required],
      price: [0.1, [Validators.required, Validators.min(0.1)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.productId = +id;
        this.loadProduct(this.productId);
      }
    });
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe((product: Product) => {
      this.productForm.patchValue(product);
    });
  }

  saveProduct() {
    if (this.isEditMode) {
      this.productService.updateProduct(this.productId!, this.productForm.value).subscribe(() => {
        alert('Producto actualizado');
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.createProduct(this.productForm.getRawValue()).subscribe(() => {
        alert('Producto agregado');
        this.router.navigate(['/products']);
      });
    }
  }
}
