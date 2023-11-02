import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _baseUrl = 'http://localhost:5000/';
  private _isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      charset: 'UTF-8',
    }),
  };

  constructor(private http: HttpClient) {}

  // Helper method to check if token exists
  private hasToken(): boolean {
    // You might be storing the token in local storage or cookies
    return !!localStorage.getItem('token');
  }

  // Observable to subscribe to for login status
  get isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  getHello(): Observable<string> {
    return this.http.get(`${this.baseUrl}/hello`, {
      responseType: 'text',
    });
  }

  uploadFile(file: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.baseUrl}/process`, formData);
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, userData, this.httpOptions).pipe(
      tap((response : any) => {
        // Handle your response and storage of token here
        localStorage.setItem('token', response.token); // Assuming the token comes in the response
        this._isLoggedIn.next(true);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, this.httpOptions).pipe(
      tap(_ => {
        // Handle the logout process
        localStorage.removeItem('token');
        this._isLoggedIn.next(false);
      })
    );
  }
}
