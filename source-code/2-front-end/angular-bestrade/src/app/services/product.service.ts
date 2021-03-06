import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})

 export class ProductService {

 /* The class below will make a get request to that back-end base URL, grab the data 
 unwrap it accordingly and make it available as an array of products. By, default 
 Spring Data REST returns only 20 in first page but, can do a workaround by adding
 "?size=100" at the end to list 100 in the first page. */ 
  private baseUrl = 'http://localhost:8080/api/products'; // Connect to product API
  
  // Connect to product category API
  private categoryUrl = 'http://localhost:8080/api/product-category';
 /* Injecting HttpClient as Angular has a dependence injection framework */ 
  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {
    // Need to build URL based on product id.
    const productUrl = `${this.baseUrl}/${theProductId}`;
    // Call the REST API based on its product URL
    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): 
                        Observable<GetResponseProducts> { 

    /* I need to build URL based on the category id, page and size. Spring Data REST 
    automatically supports pagination out of the box. Just send the parameters for page and 
    size. */
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl); 

  } 

  // A method to get Product List which returns an observable of product array
  getProductList(theCategoryId: number): Observable<Product[]>{ 

    /* I need to build URL based on the category id. Spring Data REST automatically 
    exposes endpoint so will need to make only the base URL dynamic. */
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);  

  } 

  /* Line 56 calls the method getProducts on lines 59-65 and returns the value to function
  searchProducts which was just extracted in line 50-57. */

  searchProducts(theKeyword: string): Observable<Product[]> {
  /* I need to build URL based on the category id. Spring Data REST automatically 
  exposes endpoint so will need to make only the base URL dynamic. */
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

  /* Returns an observable: Map the JSON data from Spring Data REST to Product Array */
    return this.getProducts(searchUrl); 
  }

  searchProductsPaginate(thePage: number, thePageSize: number, theKeyword: string): 
                        Observable<GetResponseProducts> { 

  /* I need to build URL based on the keyword, page and size. Spring Data REST 
  automatically supports pagination out of the box. Just send the parameters for page and 
  size. */
  const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;

  return this.httpClient.get<GetResponseProducts>(searchUrl); 
  } 

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      /* Map the data to our given data type to grab that response from embedded: products
      to make use of products array*/
      map(response => response._embedded.products)
    );
  }

  /* A method to get Product Categories which returns an observable of product 
  categories array */
  getProductCategories(): Observable <ProductCategory[]> {
    /* Returns an observable: Map the JSON data from Spring Data REST to Product 
    Category Array */
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
       /* Map the data to our given data type to grab that response from embedded: products 
       to make use of product category array*/ 
      map(response => response._embedded.productCategory)
    ); 
  }

}
 /* Also adding an supporting interface to help us with the mapping above to unwrap the 
 JSON data from the spring of data REST API */
 interface GetResponseProducts {
 /* This will help us to make use of _embedded entry that comes back from the spring 
 data REST API. */
   _embedded: {
    // Access the array of product
    products: Product[];
  },
  page: {
    size: number; //Size of this page
    totalElements: number, /* Grand total of all elements in the db but we aren't returning 
    all of them, just the count for informational purposes only. */
    totalPages: number, // Total pages available
    number: number // Current page number
  }
}

interface GetResponseProductCategory {
  /* This will help us to make use of _embedded entry that comes back from the
  spring data REST API. */
    _embedded: {
     // Acess the array of product
     productCategory: ProductCategory[];
   }
 }
