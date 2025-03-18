import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';// Importar el HttpClient e inyectarlo en el constructor
import { Observable } from 'rxjs';
import { LoginResponse } from './models/loginResponse';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private isLoggedInVar: boolean = false;
  private apiUrl = "http://localhost:8080";
  private token = localStorage.getItem('accessToken'); // Obtener el token JWT almacenado en localStorage

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return this.isLoggedInVar;
  }

  set setIsLoggedInVar(value: boolean) {

    this.isLoggedInVar = value;
  }

  login(email: string, password: string): Observable<LoginResponse> {


    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password });
  }

  logout(): void {
    this.isLoggedInVar = false;
  }

  //cambio de role
  getUserRole(): string {
    const userRole = localStorage.getItem('userRole');
    return userRole || 'usuario';
  }


  // Obtener órdenes de cocina
  obtenerOrdenesCocina(): Observable<any[]> {
    // Crear los encabezados con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    });

    // Enviar la solicitud HTTP con los encabezados
    return this.http.get<any[]>(`${this.apiUrl}/orders`, { headers });
  }


  marcarOrdenComoListo(idOrden: number): Observable<any> {
    const authToken = localStorage.getItem('accessToken');

    if (!authToken) {
      console.error('No se encontró el token de autenticación.');
      return of(undefined);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })
    };

    // Aquí puedes ajustar la URL según tu API
    return this.http.patch<any>(`${this.apiUrl}/orders/${idOrden}`, { status: 'delivering' }, httpOptions);
  }


}
