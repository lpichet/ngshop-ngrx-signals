import { Component, Input, inject } from '@angular/core';
import { Product } from '../product.model';
import { CommonModule, DecimalPipe, getCurrencySymbol } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsStore } from '../product.store';

@Component({
  selector: 'ngshop-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, DecimalPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor() { }
  private store = inject(ProductsStore);
  currencySymbol(): string {
    return getCurrencySymbol('EUR','narrow');
  }

  buttonCartClicked() {
    this.store.addProductToCart(this.product);
  }

  getRatingClasses(rating: number, index: number) {
    return {
      styles_starIcon: rating >= index,
      styles_emptyStarIcon: rating < index
    }
  }
}
