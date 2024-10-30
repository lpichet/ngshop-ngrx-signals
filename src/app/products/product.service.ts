import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { Product } from './product.model';
import { environment } from '../../environments/environment';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { 
    this.http.get<Product[]>(`${environment.apiUrl}/products`).subscribe(products => {
      this.products$.next(products);
    });
  }

  products$ = new BehaviorSubject<Product[]>([]);

  getProducts(): Observable<Product[]> {
    // return this.http.get<Product[]>("https://fakestoreapi.com/products");
    //return this.http.get<Product[]>(`${environment.apiUrl}/products`);
    return this.products$.asObservable();
  }

  getProductById(id: number): Observable<Product | null> {
    // return this.http.get<Product>(`https://fakestoreapi.com/products/${id}`);
    //return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
    return this.products$.pipe(map(products => products.find(p => p.id === id) ?? null ))
  }
}
