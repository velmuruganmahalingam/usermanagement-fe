import { Injectable } from '@angular/core';
import { HttpClient,HttpParams  } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users';
  constructor(private http: HttpClient) { }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }

  getUsers(filters: { search: string; role: string }): Observable<any[]> {
    let params = new HttpParams();
    
    if (filters.search) {
      params = params.set('search', filters.search);
    }
    
    if (filters.role) {
      params = params.set('role', filters.role);
    }

    return this.http.get<any[]>(this.apiUrl, { params });
  }

  logout(): Observable<any> {
    
    localStorage.removeItem('authToken'); 
    return of(null); 
  }
}
