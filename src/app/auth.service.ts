import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';// Importar el HttpClient e inyectarlo en el constructor
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // metodo post para la peticiones

  private apiUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  //login(email: string, password: string): Observable<boolean> {
    login(email: string, password: string): Observable<{ accessToken: string }> {

    const body = { email, password };
    //return this.http.post<any>(`${this.apiUrl}/login`, body);
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, body);

  }
}

