import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProductResponse} from './models/productResponse';
import { Observable } from 'rxjs';  // Agrega esta importación

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }


  // header para obtener los 20 productos

  obtenerPedidos() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    });

    console.log('El componente PedidoComponent se ha inicializado.');

    return this.http.get<ProductResponse[]>("http://localhost:8080/products", {headers})
    
  }

  // header para eliminar un producto del resumen de compra

  // eliminarProductoDelPedido(orderId: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //   });
  
  //   return this.http.delete(`http://localhost:8080/orders/${orderId}`, { headers });
  // }
}
