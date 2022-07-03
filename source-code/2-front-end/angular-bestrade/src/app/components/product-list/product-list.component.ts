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
  currentCategoryName: string;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // Add some new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

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
    // Given keyword passed in from app.module.ts to search-component.ts 
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){ // If there is a keyword
      this.handleSearchProducts(); //Call hand;eSearchProducts
    }

    else {
    this.handleListProducts();
    }

  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // Now search for products using that given keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    ) 
  }

  handleListProducts(){

    /*  Check if "id" parameter is available by using the activated route ("route"), state
    of the route at this given point in time and map of all the route parameters. If 
    available returns true, if not then false. */
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // Get the "id" param string, convert that string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

      // Get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    else {
      /* No category if available then, default it to category id 1 and name of 
      'Books'. */
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }


    // Check if I have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed


    // If I have a different category id than previous then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, 
                thePageNumber=${this.thePageNumber}`);

    // Now get the products for the given category id  
    /* Make use of my productService and call getProductListPaginate and actually subscribe to the
    data. Method is invoked once you subscribe() in an asynchronus fashion. Pagiantion 
    component: pages are 1 based whereas in Spring Data REST: pages are 0 based. */ 
    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                               this.thePageSize,
                                               this.currentCategoryId)
                                               .subscribe(this.processResult());
  }

  processResult() {
    // Map data from JSON response to properties in this class. 
    return (data: any) => {
      /* Left-hand side of assignment are properties defined in this class and everything on 
      the right hand side of assignment is data from Spring Data REST JSON. */
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  // Method to update page size
  updatePageSize(pageSize: number){
    this.thePageSize = pageSize; // Make an assignment
    this.thePageNumber = 1; // Make an assignment
    this.listProducts(); /* Call list products to refresh the page view based on the 
    new information after it has for page size, number and so on. */ 
  }

}
