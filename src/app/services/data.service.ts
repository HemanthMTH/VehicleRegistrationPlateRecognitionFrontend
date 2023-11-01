import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _baseUrl = 'http://localhost:5000/';

  constructor(private http: HttpClient) {}

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
    return this.http.post(`${this.baseUrl}/login`, userData);
  }
}
