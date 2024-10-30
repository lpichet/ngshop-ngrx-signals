import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserCredentials } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$ = new BehaviorSubject<UserCredentials | null>(null);

  constructor(private http: HttpClient) {
    
   }

   getUser(): Observable<UserCredentials | null> {
    return this.user$.asObservable();
   }

   login(credentials: UserCredentials) {
    this.http.get<UserCredentials>(`${environment.apiUrl}/users?email=${credentials.email}&password=${credentials.password}&limit=1`).subscribe(
      { 
        next: user => {
          if(user) {
            this.user$.next(user)
          } else {
            this.user$.error("not found");
          }},
        error: () => this.user$.error("not found")
    });
   }
}
