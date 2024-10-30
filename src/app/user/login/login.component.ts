import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserCredentials } from '../user.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'ngshop-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials: UserCredentials = {email: '', password: ''}
  hasError = false;
  
  constructor(private router: Router, private userService: UserService) {
    this.userService.getUser().subscribe({
      next: (user) => {
        if(user) {
          this.router.navigate(['/'])
        }},
      error: () => {
        this.hasError = true;
      }
    })
  }

  login() {
    this.hasError = false;
    this.userService.login(this.credentials);
  }
}
