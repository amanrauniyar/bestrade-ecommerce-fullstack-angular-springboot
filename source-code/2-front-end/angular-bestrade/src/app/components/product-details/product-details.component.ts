import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product(); // Define a property for product

  // Injecting the dependency for actual ProductService and ActivatedRoute.
  constructor(private productService: ProductService, private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Subscribe on the params and make a call to method handleProductDetails. 
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  // Define the method handleProductDetails
  handleProductDetails() {

    // Get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToCart() {
    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }

}
