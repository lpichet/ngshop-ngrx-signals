import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import products from '../products.json';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [provideRouter([{path: '**', component: ProductCardComponent}]),
      provideHttpClient()
    ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = products[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('rating', () => {
    it('should not have rating for first product', () => {
      const element = fixture.debugElement.query(By.css('.styles_rating'));
      expect(element.attributes["title"]).toBe('no rating (yet)');
    });

    it('should have rating for third product', () => {
      component.product = products[2];
      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('.styles_rating'));
      expect(element.attributes["title"]).toBe('4.7');
    });
  });

  describe('getRatingClasses', () => {
    it('should return starIcon if rating is greaterThan index', () => {
      const result = component.getRatingClasses(2, 1);
      expect(result).toEqual({
        styles_starIcon: true,
        styles_emptyStarIcon: false
      })
    })

    it('should return starIcon if rating is equal to index', () => {
      const result = component.getRatingClasses(2, 2);
      expect(result).toEqual({
        styles_starIcon: true,
        styles_emptyStarIcon: false
      })
    })

    it('should return emptyStarIcon if rating is lesser than index', () => {
      const result = component.getRatingClasses(1, 2);
      expect(result).toEqual({
        styles_starIcon: false,
        styles_emptyStarIcon: true
      })
    })
  })
});
