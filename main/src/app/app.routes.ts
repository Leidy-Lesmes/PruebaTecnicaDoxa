
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { AppSideLoginComponent } from './authentication/side-login/side-login.component';
import { ProductsComponent } from './features/products/products.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { ProductFormComponent } from './features/product-form/product-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AppSideLoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/new', component: ProductFormComponent }, 
  { path: 'products/edit/:id', component: ProductFormComponent },
  { path: 'products/:id', component: ProductDetailComponent },
];

export const routerProvider = provideRouter(routes);
