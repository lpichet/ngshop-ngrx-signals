import { TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { provideRouter } from '@angular/router';
import { ProductService } from '../product.service';
import { of } from 'rxjs';
import products from '../products.json';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../truncate.pipe';
import { By } from '@angular/platform-browser';
import productsJson from '../products.json';
import { Product } from '../product.model';
import { RouterTestingHarness, } from '@angular/router/testing';
import { provideLocationMocks } from '@angular/common/testing';
import { provideHttpClient } from '@angular/common/http';

async function setup(products:Product[] = productsJson) {
  const productServiceStub = {
    getProducts: jasmine.createSpy().and.returnValue(of(products)),
  };
  await TestBed.configureTestingModule({
    imports: [ProductListComponent, CommonModule, TruncatePipe],
    providers: [provideRouter([
      {path: 'products/:category', component: ProductListComponent},
      {path: '**', component: ProductListComponent}
    ]),
    provideHttpClient(),
    provideLocationMocks(),
    {provide: ProductService, useValue: productServiceStub}
  ]
  })
  .compileComponents();
  
  const fixture = TestBed.createComponent(ProductListComponent);
  const component = fixture.componentInstance;
  fixture.detectChanges();
  productServiceStub.getProducts = jasmine.createSpy().and.returnValue(of(products));
  fixture.detectChanges();
  return {fixture, component};
}

describe('ProductList', () => {
    it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  it('should create product card components', async () => {
    const { fixture } = await setup();
    const productCardComponents = fixture.nativeElement.querySelectorAll('ngshop-product-card');
    expect(productCardComponents.length).toBe(products.length);
  });

  it('should display message if there is no product', async () => {
    const { fixture } = await setup([]);
    const messageElement = fixture.debugElement.query(By.css('.styles_card'));
    expect(messageElement.nativeElement.textContent).toBe('There are no items.');
  });

  it('should filter to 6 products for category electronics', async () => {
    await setup();
    const harness = await RouterTestingHarness.create('/');
    await harness.navigateByUrl('/products/electronics', ProductListComponent);
    const cardElements = harness.routeNativeElement?.querySelectorAll('.styles_card');
    expect(cardElements?.length).toBe(6);
  })

  it('should filter to 6 products for category jewelery', async () => {
    await setup();
    const harness = await RouterTestingHarness.create('/');
    await harness.navigateByUrl('/products/jewelery', ProductListComponent);
    const cardElements = harness.routeNativeElement?.querySelectorAll('.styles_card');
    expect(cardElements?.length).toBe(4);
  })
});
