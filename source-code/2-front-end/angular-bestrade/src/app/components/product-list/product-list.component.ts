import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number; // Add a new property for currentCategoryId
  /* Inject the dependency ProductService into this product list component. */
  constructor(private productService: ProductService,
    private route: ActivatedRoute) { } // Useful for accessing the route parameters.

  /* Once the angular component has been initialized they'll call the ngOnInIt mwthod. */
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      /* Similar to @PostConstruct where hook is added to call my listProducts method. */
      this.listProducts(); 
    });
  }

  listProducts() {
    /*  Check if "id" parameter is available by using the activated route ("route"), state
    of the route at this given point in time and map of all the route parameters. If 
    available returns true, if not then false. */
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // Get the "id" param string, convert that string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // No category if available then, default it to category id 1.
      this.currentCategoryId = 1;
    }

    // Now get the products for the given category id  
    /* Make use of my productService and call getProductList and actually subscribe to the
    data. Method is invoked once you subsribe() in an asynchronus fashion.*/ 
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
      /* Assign results to the Product array for integrating our service with Angular 
      Component */
        this.products = data;
      }
    )
  }

}
