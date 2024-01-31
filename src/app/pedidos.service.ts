import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProductResponse} from './models/productResponse';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  obtenerPedidos() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    });

    console.log('El componente PedidoComponent se ha inicializado.');

    return this.http.get<ProductResponse[]>("http://localhost:8080/products", {headers})



  }

}
