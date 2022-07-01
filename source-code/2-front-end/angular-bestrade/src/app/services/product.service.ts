import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService { /* This class will make a get request to that back-end
base URL, grab the data unwrap it accordingly and make it available as an array of
products. */

  private baseUrl = 'http://localhost:8080/api/products'; // Connect to product API

  constructor(private httpClient: HttpClient) { } /* Injecting HttpClient as Angular 
  has a dependence injection framework */ 

  // A method to get Product List which returns an observable of product array
  getProductList(): Observable<Product[]>{ /* Returns an observable: Map the JSON data 
  from Spring Data REST to Product Array */
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products) /* Map the data to our given data type
      to grab that response from embedded: products to make use of products array*/ 
    ); 
  } 
}
interface GetResponse { /* Also adding an supporting interface to help us with the
mapping above to unwrap the JSON data from the spring of data REST API */
  _embedded: { /* This will help us to make use of _embedded entry that comes back from
   the spring data REST API. */
    products: Product[]; // Acess the array of product
  }
}
