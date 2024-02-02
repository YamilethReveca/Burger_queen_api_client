import { Component, OnInit } from '@angular/core';

import { ProductResponse } from '../models/productResponse';

import { Subscription } from 'rxjs';

import { PedidosService } from '../pedidos.service';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {


  productos: ProductResponse[] = []; // los productos completos
  pedido: ProductResponse[] = [];  // uno por uno para el resumen 
  total: number = 0; // inicializo en 0 el total

  private subscription: Subscription | undefined;

  constructor(private pedidoService: PedidosService) { }

  ngOnInit(): void {

    this.subscription = this.pedidoService.obtenerPedidos().subscribe(

      (response: ProductResponse[]) => {

        this.productos = response;

      },

      () => { })




  }


  agregarAlPedido(producto: ProductResponse): void {
    // Agregar el producto al array del pedido
    this.pedido.push(producto);

    this.total = this.pedido.reduce((acc, curr) => acc + curr.price, 0);
  }




}
