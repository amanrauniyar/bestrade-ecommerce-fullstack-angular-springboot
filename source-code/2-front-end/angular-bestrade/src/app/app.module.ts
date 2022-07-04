import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


/* Define routes. Order of routes is important. First match wins. Start from specific to 
generic. */
const routes: Routes = [
  // Set up route for checkout and map over to the CheckoutComponent
  {path: 'checkout', component: CheckoutComponent},
  // Set up route for cart details and map over to the CartDetailsComponent
  {path: 'cart-details', component: CartDetailsComponent},
  //Set up route for product details for master view
  {path: 'products/:id', component: ProductDetailsComponent},
  // Set up route for product search by keyword
  {path: 'search/:keyword', component: ProductListComponent},
  // Set up routes for category by id and add a new name parameter to the route.
  { path: 'category/:id/:name', component: ProductListComponent },
  // Set up route for category by itself.
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
  declarations: [AppComponent, ProductListComponent, ProductCategoryMenuComponent, 
                SearchComponent, ProductDetailsComponent, CartStatusComponent, 
                CartDetailsComponent, CheckoutComponent],
  imports: [RouterModule.forRoot(routes), BrowserModule, HttpClientModule, NgbModule,
           ReactiveFormsModule],
  providers: [ProductService],
  bootstrap: [AppComponent],
  exports: [FormsModule, ReactiveFormsModule]
})
export class AppModule { }
