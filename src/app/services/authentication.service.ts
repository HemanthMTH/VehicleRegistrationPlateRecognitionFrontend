import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private dataService: DataService) {
    this.checkInitialAuthState();
  }

  isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  checkInitialAuthState() {
    // Here you would check some persistent storage, e.g., localStorage,
    // to see if the user data/token is still there when the app initializes
    const token = localStorage.getItem('authToken');
    this.loggedIn.next(!!token);
  }

  login(userData: any): Observable<any> {
    return this.dataService.login(userData).pipe(
      tap(response => {
        // Handle response, set the token/user data in localStorage
        localStorage.setItem('authToken', response.token);
        this.loggedIn.next(true);
      })
    );
  }

  logout() {
    return this.dataService.logout().pipe(
      tap(() => {
        // Clear the token/user data from localStorage
        localStorage.removeItem('authToken');
        this.loggedIn.next(false);
      })
    );
  }
}
