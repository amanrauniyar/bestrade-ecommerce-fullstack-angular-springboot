import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
/* Define routes. Order of routes is important. First match wins. Start from specific to 
generic. */
const routes: Routes = [
  // Set up routes for category by id and add a new name parameter to the route.
  { path: 'category/:id/:name', component: ProductListComponent },
  // Set up routes for category by itself.
  { path: 'category', component: ProductListComponent }, 
  // Also set up routes for products by itself.
  { path: 'products', component: ProductListComponent }, 
  /* Empty paths will redirect to /products where rules don't apply so, forward slash is used 
  to match full path instead of prefix. */
  { path: '', redirectTo: '/products', pathMatch: 'full' }, 
  /* Generic wild card (**) will redirect to /products if they don't match on anything on 
  above routes. */
  { path: '**', redirectTo: '/products', pathMatch: 'full' }, 
];

@NgModule({
  declarations: [AppComponent, ProductListComponent, ProductCategoryMenuComponent],
  imports: [RouterModule.forRoot(routes), BrowserModule, HttpClientModule],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
