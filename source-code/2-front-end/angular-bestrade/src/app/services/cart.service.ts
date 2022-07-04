import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  /* Subject is a subclass of observable used to publish events in our code. This 
  event will be sent to all sunbsrcibers. */
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {

    // Check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {
      /* Find the item in the cart based on item id using array method (find) which 
      returns first element that passes else returns undefined & tempCartItem.id === 
      theCartItem.id is a test conditional which executes each element in the array until
      test passes where, tempCartItem is the current array element before (=>) sign. */
      existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === 
                                            theCartItem.id );
      

      // Check if it found items in cart
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      // Increment the quantity
      existingCartItem.quantity++;
    }
    else {
      // Just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // Compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }    

    decrementQuantity(theCartItem: CartItem) {
      
      theCartItem.quantity--;

      if (theCartItem.quantity === 0) {
        this.remove(theCartItem);
      }
      else {
        this.computeCartTotals();
      }

    }

    remove(theCartItem: CartItem) {

      // Get the index of item in the array
      const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === 
        theCartItem.id );

      // If found, remove the item from the array at the given index
      if (itemIndex >= 0) {
        this.cartItems.splice(itemIndex, 1);

        this.computeCartTotals();
      }

    }


}
