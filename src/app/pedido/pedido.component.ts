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


  productos: ProductResponse[] = [];

  private subscription: Subscription | undefined;

  constructor(private pedidoService: PedidosService) { }

  ngOnInit(): void {

    this.subscription = this.pedidoService.obtenerPedidos().subscribe(

      (response: ProductResponse[]) => {

        this.productos = response;

      },



      () => { })

  }


}
