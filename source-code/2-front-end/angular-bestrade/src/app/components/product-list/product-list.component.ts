import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list-table.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
    
  constructor(private productService: ProductService) { } /* Inject the dependency
  ProductService into this product list component. */

  /* Once the angular component has been initialized they'll call the ngOnInIt mwthod. */
  ngOnInit() {
  /* Similar to @PostConstruct where hook is added to call my listProducts method. */
  this.listProducts() 
  }

  listProducts() {
    /* Make use of my productService and call getProductList and actually subscribe to the
    data. Method is invoked once you subsribe() in an asynchronus fashion.*/ 
    this.productService.getProductList().subscribe(
      data => {
      /* Assign results to the Product array for integrating our service with Angular 
      Component */
        this.products = data;
      }
    )
  }

}
