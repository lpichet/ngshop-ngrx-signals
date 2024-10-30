import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Observable, combineLatest, map } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsStore } from '../product.store';

@Component({
  selector: 'ngshop-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  readonly store = inject(ProductsStore);
  private route = inject(ActivatedRoute);
  params = this.route.params;
  // products$ = this.store.select('products');

  // filteredProducts$ = combineLatest([this.products$, this.params]).pipe(
  //   map(([products, params]) => {
  //     const category = params['category'] ?? '';
  //     return category !== ''
  //     ? products.filter(p => p.category === category)
  //     : products;
  //   })
  // )

  ngOnInit() {
    this.store.loadProducts();
  }
}
