import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { Product } from '../models/Product.model';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialProducts();
  }

  private loadInitialProducts() {
    this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => this.productsSubject.next(products))
    ).subscribe();
  }

  getAllProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.products$.pipe(
      map(products => products.find(p => p.id === id))
    );
  }

  createProduct(product: Product): Observable<Product> {
    // Simular creación de producto
    const newProduct = {
      ...product,
      id: this.generateTemporaryId()
    };

    const currentProducts = this.productsSubject.value;
    const updatedProducts = [...currentProducts, newProduct];
    this.productsSubject.next(updatedProducts);

    // Llamada al API (aunque no actualice los datos reales)
    this.http.post<Product>(this.apiUrl, product).subscribe();

    return of(newProduct);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const currentProducts = this.productsSubject.value;
    const updatedProducts = currentProducts.map(p => 
      p.id === id ? { ...p, ...product } : p
    );
    this.productsSubject.next(updatedProducts);

    // Llamada al API (aunque no actualice los datos reales)
    this.http.put<Product>(`${this.apiUrl}/${id}`, product).subscribe();

    return of({ ...currentProducts.find(p => p.id === id), ...product } as Product);
  }

  deleteProduct(id: number): Observable<void> {
    const currentProducts = this.productsSubject.value;
    const updatedProducts = currentProducts.filter(p => p.id !== id);
    this.productsSubject.next(updatedProducts);

    // Llamada al API (aunque no actualice los datos reales)
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe();

    return of(undefined);
  }

  private generateTemporaryId(): number {
    const currentProducts = this.productsSubject.value;
    return Math.max(...currentProducts.map(p => p.id || 0), 0) + 1;
  }
}