import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Product } from './product.model';
import { Cart } from './cart';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart$ = new BehaviorSubject<Cart>({id: 1, items: []});
  private cartSub$:Subscription;

  constructor(private http: HttpClient) {
    this.cartSub$ = this.http.get<Cart>(`${environment.apiUrl}/carts/1`).subscribe(cart => {
      this.cart$.next(cart)
    });
   }

  getCart(): Observable<Cart> {
    return this.cart$.asObservable();
  }

  addToCart(product: Product) {
    const cart = this.cart$.getValue();
    const existingItem = cart.items.find(i => i.product.id === product.id);
    if(existingItem) {
      existingItem.quantity += 1
    } else {
      cart.items.push({ product, quantity: 1})
    }
    this.http.put(`${environment.apiUrl}/carts/1`, cart).subscribe(res => {
      this.cart$.next(cart);
    })
  }
}
