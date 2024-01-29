import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';// Importar el HttpClient e inyectarlo en el constructor
import { Observable } from 'rxjs';
import { LoginResponse } from './models/loginResponse';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private isLoggedInVar: boolean = false;
  private apiUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return this.isLoggedInVar;
  }

  set setIsLoggedInVar(value: boolean) {

    this.isLoggedInVar= value;
  }

  login(email: string, password: string): Observable<LoginResponse> {
    

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password });
  }

  logout(): void {
    this.isLoggedInVar = false;
  }
}
