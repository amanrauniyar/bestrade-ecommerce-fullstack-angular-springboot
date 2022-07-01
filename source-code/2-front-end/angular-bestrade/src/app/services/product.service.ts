import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
 /* The class below will make a get request to that back-end base URL, grab the data 
 unwrap it accordingly and make it available as an array of products. */ 
 export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products'; // Connect to product API

 /* Injecting HttpClient as Angular has a dependence injection framework */ 
  constructor(private httpClient: HttpClient) { }
  // A method to get Product List which returns an observable of product array
  getProductList(): Observable<Product[]>{ 
  /* Returns an observable: Map the JSON data from Spring Data REST to Product Array */
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
  /* Map the data to our given data type to grab that response from embedded: products 
  to make use of products array*/ 
    map(response => response._embedded.products)
    ); 
  } 
}
 /* Also adding an supporting interface to help us with the mapping above to unwrap the 
 JSON data from the spring of data REST API */
 interface GetResponse {
 /* This will help us to make use of _embedded entry that comes back from the spring 
 data REST API. */
   _embedded: {
    // Acess the array of product
    products: Product[];
  }
}
