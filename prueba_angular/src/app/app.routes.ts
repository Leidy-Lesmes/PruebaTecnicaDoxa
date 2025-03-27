import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { LoginComponent } from './authentication/login/login.component';
import { ProductsComponent } from './features/products/products.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { ProductFormComponent } from './features/product-form/product-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/new', component: ProductFormComponent }, 
  { path: 'products/edit/:id', component: ProductFormComponent },
  { path: 'products/:id', component: ProductDetailComponent },
];

export const routerProvider = provideRouter(routes);
