import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductListComponent, HeaderComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
